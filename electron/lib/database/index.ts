import nedbPromises from 'nedb-promises';
import os from 'os';
import path from 'path';

const dbStudentsPath = path.resolve(
  os.homedir(),
  'ventur',
  'database',
  'students.db'
);

const dbAttendanceListPath = path.resolve(
  os.homedir(),
  'ventur',
  'database',
  'attendance-list.db'
);

const dbWorkginDaysPath = path.resolve(
  os.homedir(),
  'ventur',
  'database',
  'working-days.db'
);

const students = nedbPromises.create({
  timestampData: true,
  filename: dbStudentsPath,
});

const attendanceList = nedbPromises.create({
  timestampData: true,
  filename: dbAttendanceListPath,
});

const workingDays = nedbPromises.create({
  timestampData: true,
  filename: dbWorkginDaysPath,
});

const database = { students, attendanceList, workingDays };

export { database };
