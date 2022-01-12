/* eslint-disable no-console */
import { app, BrowserWindow, ipcMain, screen } from 'electron';

import path from 'path';
import url from 'url';
import isDev from 'electron-is-dev';

import { Student, AttendanceList, WorkingDays } from './lib/models';

let mainWindow: BrowserWindow | null;

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
      preload: path.join(__dirname, './preload/main.js'),
    },
  });

  mainWindow.removeMenu();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
    mainWindow.webContents.openDevTools({ mode: 'right' });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
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
    AttendanceList.findByDate(data).then((response) => {
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

  ipcMain.on('get-all-attendance-list-by-month', (event, data) => {
    AttendanceList.findByMonth(data).then((response) =>
      event.reply('attendance-list-by-month', response)
    );
  });

  ipcMain.on('create-working-days', (event, data) => {
    WorkingDays.findByMonth({ month: data.month }).then((response) => {
      if (response) {
        WorkingDays.update({ ...response, ...data });
      } else {
        WorkingDays.create(data);
      }
    });
  });

  ipcMain.on('get-working-days', (event, data) => {
    WorkingDays.findByMonth({ month: data.month }).then((response) => {
      event.reply('working-days', response);
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
