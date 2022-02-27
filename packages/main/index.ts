import { app, BrowserWindow, screen, ipcMain } from 'electron';
import { join } from 'path';

import { Student, AttendanceList, WorkingDays } from './lib/models';

const isMac = process.platform === 'darwin';

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
    },
  });

  if (app.isPackaged || process.env.DEBUG) {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    // eslint-disable-next-line dot-notation
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.removeMenu();
}

async function registerListeners() {
  ipcMain.handle(
    'create-student',
    (
      _,
      { name, email, password, birthday, classes_per_week, price_per_month },
    ) =>
      Student.create({
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
      }),
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
      },
    ) =>
      Student.update({
        _id,
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
      }),
  );

  ipcMain.handle('find-students', () => Student.findAll());

  ipcMain.handle('find-student', (_, { _id }) => Student.find({ _id }));

  ipcMain.handle('delete-student', (_, { _id }) => Student.delete({ _id }));

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
    },
  );

  ipcMain.handle('find-attendance-list', (_, { day, month, year }) =>
    AttendanceList.findByDate({ day, month, year }),
  );

  ipcMain.handle('find-attendance-list-by-month', (_, { month, year }) =>
    AttendanceList.findByMonth({ month, year }),
  );

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
    },
  );

  ipcMain.handle('find-working-days-by-month', (_, { month }) =>
    WorkingDays.findByMonth({ month }),
  );
}

app.whenReady().then(createWindow).then(registerListeners).catch(console.error);

app.on('window-all-closed', () => {
  mainWindow = null;
  if (!isMac) app.quit();
});

app.on('second-instance', (event) => {
  event.preventDefault();

  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
