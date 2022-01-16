/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain,screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
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

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

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

  const { width, height } = screen.getPrimaryDisplay().workAreaSize

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

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function registerListeners() {
  ipcMain.handle('create-student', async (_, data) => {
    return Student.create(data)
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

  ipcMain.on('delete-student', (_, id) => {
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

  ipcMain.on('create-working-days', (_, data) => {
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
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .then(registerListeners)
  .catch(console.log);
