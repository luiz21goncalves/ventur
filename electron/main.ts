/* eslint-disable no-console */
import { app, BrowserWindow, ipcMain, screen } from 'electron';

import isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function registerListeners() {
  ipcMain.on('create-student', (event, data) => {
    Student.create(data).then((result) =>
      event.reply('student-created', {
        to: `/students/${result._id}`,
        result,
      })
    );
  });

  ipcMain.on('get-all-students', (event) => {
    Student.findAll().then((result) => event.reply('all-students', result));
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
