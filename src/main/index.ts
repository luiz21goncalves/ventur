import path from 'node:path'

import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, screen, shell } from 'electron'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

import icon from '../../resources/icon.png'

function createWindow(): void {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize

  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    height,
    show: false,
    width,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const fileRoute = createFileRoute(
    path.join(__dirname, '../renderer/index.html'),
    'main',
  )

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    const devServerURL = createURLRoute(
      process.env.ELECTRON_RENDERER_URL,
      'main',
    )

    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
