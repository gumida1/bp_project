import { app, BrowserWindow, shell, ipcMain, dialog, globalShortcut} from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

//const fs = require('fs')
const path = require('path')
const fs = require('fs-extra');

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
    icon: join(process.env.PUBLIC, 'favicon.ico'),
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

  globalShortcut.register("Ctrl+O", ()=> {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then((result)=>{
      console.log("result", result)
    })
  })

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
    const result = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
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