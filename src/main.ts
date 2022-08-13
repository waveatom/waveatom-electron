
import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs';
import path from 'path'
import { addFileForGit } from './utils'

function createWindow () {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadURL('http://localhost:8000/preview')

  // win.webContents.openDevTools()
}


ipcMain.on("readImage", (e, data) => {
  if(data.repo && data.name) {
    addFileForGit(data)
  }
})


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