/* eslint global-require: off, no-console: off, promise/always-return: off */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';
import { Student, AttendanceList, WorkingDays } from './lib/models';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.removeMenu();

  // eslint-disable-next-line
  new AppUpdater();
};

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

async function registerListeners() {
  ipcMain.handle(
    'create-student',
    (
      _,
      { name, email, password, birthday, classes_per_week, price_per_month }
    ) => {
      return Student.create({
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
      });
    }
  );

  ipcMain.handle(
    'update-student',
    (
      _,
      {
        _id,
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
      }
    ) => {
      return Student.update({
        _id,
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
      });
    }
  );

  ipcMain.handle('find-students', () => {
    return Student.findAll();
  });

  ipcMain.handle('find-student', (_, { _id }) => {
    return Student.find({ _id });
  });

  ipcMain.handle('delete-student', (_, { _id }) => {
    return Student.delete({ _id });
  });

  ipcMain.handle(
    'create-attendance-list',
    async (_, { day, month, year, students }) => {
      const attendanceList = await AttendanceList.findByDate({
        day,
        month,
        year,
      });

      if (attendanceList) {
        return AttendanceList.update({
          _id: attendanceList._id,
          day,
          month,
          year,
          students,
        });
      }

      return AttendanceList.create({ day, month, year, students });
    }
  );

  ipcMain.handle('find-attendance-list', (_, { day, month, year }) => {
    return AttendanceList.findByDate({ day, month, year });
  });

  ipcMain.handle('find-attendance-list-by-month', (_, { month, year }) => {
    return AttendanceList.findByMonth({ month, year });
  });

  ipcMain.handle(
    'create-working-days',
    async (_, { month, number_of_weeks, date }) => {
      const workingDays = await WorkingDays.findByMonth({
        month,
      });

      if (workingDays) {
        return WorkingDays.update({
          _id: workingDays._id,
          month,
          number_of_weeks,
          date,
        });
      }

      return WorkingDays.create({ month, number_of_weeks, date });
    }
  );

  ipcMain.handle('find-working-days-by-month', (_, { month }) => {
    return WorkingDays.findByMonth({ month });
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event) => {
    event.preventDefault();

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app
    .whenReady()
    .then(createWindow)
    .then(registerListeners)
    .catch(console.error);
}
