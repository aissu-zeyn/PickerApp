const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = !app.isPackaged

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  // Load the app
  if (isDev) {
    // In development, try ports 5173 and 5174
    const tryLoad = (port) => {
      mainWindow.loadURL(`http://localhost:${port}`).catch(() => {
        if (port === 5173) {
          tryLoad(5174)
        } else {
          console.error('Failed to load development server')
        }
      })
    }
    tryLoad(5173)
    mainWindow.webContents.openDevTools()
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Log any errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
}) 