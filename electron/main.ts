/* eslint-disable no-console */
import { app, BrowserWindow, ipcMain, screen } from 'electron';

import isDev from 'electron-is-dev';

import { Student, AttendanceList } from './lib/models';

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
    mainWindow.webContents.openDevTools({ mode: 'right' });
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

  ipcMain.on('update-student', (event, data) => {
    Student.update(data).then(() =>
      event.reply('update-student-response', {
        to: `/students/${data._id}`,
        result: data,
      })
    );
  });

  ipcMain.on('get-all-students', (event) => {
    Student.findAll().then((result) => event.reply('all-students', result));
  });

  ipcMain.on('get-student', (event, id) => {
    Student.find(id).then((result) =>
      event.reply('get-student-response', result)
    );
  });

  ipcMain.on('delete-student', (event, id) => {
    Student.delete(id);
  });

  ipcMain.on('create-attendance-list', (event, data) => {
    AttendanceList.findByDate(data.date).then((response) => {
      if (response._id) {
        AttendanceList.update({ ...response, ...data });
      } else {
        AttendanceList.create(data).then((attendanceResponse) => {
          event.reply('show-attendance-list', attendanceResponse);
        });
      }
    });
  });

  ipcMain.on('get-attendance-list', (event, date) => {
    AttendanceList.findByDate(date).then((response) => {
      event.reply('show-attendance-list', response);
    });
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
