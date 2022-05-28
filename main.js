const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadURL('http://localhost:8000/')

  win.webContents.openDevTools()
}

// ipcRenderer.on('async-reply',(event,arg) => {
//   console.log(arg);
// });

ipcMain.on("readImage", (e, data) => {
  console.log('readImage----', data)
  fs.writeFileSync(path.resolve('../../a.markdown'),  data.content, 'utf-8')
  
})

console.log('ipcMain', ipcMain)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})