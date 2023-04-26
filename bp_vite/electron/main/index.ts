import { app, BrowserWindow, shell, ipcMain, dialog, globalShortcut} from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

//const fs = require('fs')
const path = require('path')
const fs = require('fs-extra');
const archiver = require('archiver');
const rimraf = require('rimraf');
const { createWriteStream } = require('archiver');
const StreamZip = require('node-stream-zip');

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'logo2.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  /*globalShortcut.register("Ctrl+O", ()=> {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then((result)=>{
      console.log("result", result)
    })
  })*/

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})




//const { ipcMain, dialog } = require("electron");
ipcMain.handle("showDialog", async (e, message) => {
  try {
    const result = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],filters: [{ name: 'Images', extensions: ['jpg'] }] });
    console.log("result", result)
    let copiedFilePaths = []

    if (!result.canceled && result.filePaths.length > 0) {
      // Get the path to the user's app data folder
      const userDataPath = app.getPath('userData')
      const imagesFolderPath = path.join(userDataPath, 'images')

      // Check if the images folder exists, and create it if it doesn't
      if (!fs.existsSync(imagesFolderPath)) {
        fs.mkdirSync(imagesFolderPath)
      }

      const promises = result.filePaths.map(sourcePath => {
        const filename = path.basename(sourcePath);
        const destinationPath = path.join(userDataPath, 'images', filename);

        return new Promise((resolve, reject) => {
          fs.copyFile(sourcePath, destinationPath, (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(`File ${filename} copied successfully!`);
              copiedFilePaths.push(destinationPath);
              console.log(copiedFilePaths);
              //$store.commit('save_image_path', {path: destinationPath})
              resolve(result);
            }
          });
        });
      });

      await Promise.all(promises);

      // Return the file paths to the renderer process
      const bpviteFilePaths = result.filePaths.map(filePath => `bpvite://${path.basename(filePath)}`)
      console.log('tady:', copiedFilePaths)
      e.sender.send('dialogResult', copiedFilePaths); // send the result back to the renderer process
      return bpviteFilePaths
    } else {
      // Return null if the user cancelled the dialog
      return null
    }
  } catch (error) {
    console.error(error);
    return null;
  }
});

ipcMain.handle("saveDialog", async (e, serialized, images) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"], // set the dialog properties to only allow selection of a directory
    });

    if (!result.canceled) {
      const selectedPath = result.filePaths[0]; // get the selected path
      const savePath = selectedPath + '/save_case/case.json'; // set the file path to the save_case folder
      fs.mkdirSync(selectedPath + '/save_case'); // create the save_case folder

      images.forEach((imagePath) => {
        const imageName = path.basename(imagePath);
        const saveImagePath = selectedPath + '/save_case/' + imageName;
        fs.copyFile(imagePath, saveImagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Image " + imagePath + " copied successfully to " + saveImagePath);
        });
      });


      fs.writeFile(savePath, serialized, (err) => { // write the file to the save_case folder
        if (err) {
          console.error(err);
          return;
        }
        console.log("File saved successfully!");
      });


      const folderPath = selectedPath + '/save_case';
      const zipStream = fs.createWriteStream(folderPath + '.zip');

      const archive = archiver('zip', {
        zlib: { level: 9 } // set compression level to maximum
      });
      archive.pipe(zipStream);

      archive.directory(folderPath, false);

      archive.finalize().then(() => {
        // rename the zip file to .sps extension
        fs.rename(folderPath + '.zip', folderPath + '.sps', (err) => {
          if (err) {
            console.error('Failed to rename zip file:', err);
          } else {
            console.log('Successfully compressed and renamed the folder.');
          }
        });
      }).catch((err) => {
        console.error('Failed to compress the folder:', err);
      });

      e.sender.send('saveDialogResult', savePath); // send the result back to the renderer process
      return savePath;
    } else {
      // Return null if the user cancelled the dialog
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
});

/* -- otevirani .sps -- */
ipcMain.handle("showDialog_2", async (e, message) => {
  try {
    const result = await dialog.showOpenDialog({ properties: ['openFile'],filters: [{ name: 'Spis', extensions: ['sps'] }] });
    console.log("result", result)

    if (!result.canceled && result.filePaths.length > 0) {
      const spsFilePath = result.filePaths[0];
      const userDataPath = app.getPath('userData')
      const imagesFolderPath = path.join(userDataPath, 'images')

      // Check if the images folder exists, and create it if it doesn't
      if (!fs.existsSync(imagesFolderPath)) {
        fs.mkdirSync(imagesFolderPath)
      }
      const unzipPath = imagesFolderPath;

      const zip = new StreamZip({
        file: spsFilePath,
        storeEntries: true
      });

      zip.on('ready', () => {
        // Extract all entries in the archive to the unzipPath directory
        zip.extract(null, unzipPath, (err, count) => {
          if (err) {
            console.error('Failed to extract archive:', err);
          } else {
            console.log(`Extracted ${count} entries to ${unzipPath}`);

            // Read the extracted files and perform further operations
            const fileNames = fs.readdirSync(unzipPath);
            for (const fileName of fileNames) {
              console.log(`Opening file ${fileName}`);
              // Perform further operations on the extracted files
            }
          }

          // Close the archive
          zip.close();
        });
      });

      e.sender.send('dialogResult_2', imagesFolderPath); // send the result back to the renderer process
      return result
    } else {
      // Return null if the user cancelled the dialog
      return null
    }
  } catch (error) {
    console.error(error);
    return null;
  }
});


