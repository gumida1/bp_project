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

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

if (release().startsWith('6.1')) app.disableHardwareAcceleration()

if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: './public/znak_jmk.ico',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  /*globalShortcut.register("Ctrl+O", ()=> {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then((result)=>{
      console.log("result", result)
    })
  })*/

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
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
    const result = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],filters: [{ name: 'Images', extensions: ['jpg', 'jpeg'] }] });
    console.log("result", result)
    let copiedFilePaths = []

    if (!result.canceled && result.filePaths.length > 0) {
      const userDataPath = app.getPath('userData')
      const imagesFolderPath = path.join(userDataPath, 'images')

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

              copiedFilePaths.push(destinationPath);

              resolve(result);
            }
          });
        });
      });

      await Promise.all(promises);


      const bpviteFilePaths = result.filePaths.map(filePath => `bpvite://${path.basename(filePath)}`)

      e.sender.send('dialogResult', copiedFilePaths);
      return bpviteFilePaths
    } else {

      return null
    }
  } catch (error) {

    return null;
  }
});

ipcMain.handle("saveDialog", async (e, serialized, images) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled) {
      const selectedPath = result.filePaths[0];
      const savePath = selectedPath + '/save_case/case.json';
      fs.mkdirSync(selectedPath + '/save_case');

      images.forEach((imagePath) => {
        const imageName = path.basename(imagePath);
        const saveImagePath = selectedPath + '/save_case/' + imageName;
        fs.copyFile(imagePath, saveImagePath, (err) => {
          if (err) {

            return;
          }

        });
      });


      fs.writeFile(savePath, serialized, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File saved successfully!");
      });


      const folderPath = selectedPath + '/save_case';
      const zipStream = fs.createWriteStream(folderPath + '.zip');

      const archive = archiver('zip', {
        zlib: { level: 9 }
      });
      archive.pipe(zipStream);

      archive.directory(folderPath, false);

      archive.finalize().then(() => {
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

      e.sender.send('saveDialogResult', savePath);
      return savePath;
    } else {

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

      if (!fs.existsSync(imagesFolderPath)) {
        fs.mkdirSync(imagesFolderPath)
      }
      const unzipPath = imagesFolderPath;

      const zip = new StreamZip({
        file: spsFilePath,
        storeEntries: true
      });

      zip.on('ready', () => {

        zip.extract(null, unzipPath, (err, count) => {
          if (err) {

          } else {

            const fileNames = fs.readdirSync(unzipPath);
            for (const fileName of fileNames) {

            }
          }

          zip.close();
        });
      });

      e.sender.send('dialogResult_2', imagesFolderPath);
      return result
    } else {

      return null
    }
  } catch (error) {
    console.error(error);
    return null;
  }
});


