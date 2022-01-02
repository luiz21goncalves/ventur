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
  'attendanceList.db'
);

const students = nedbPromises.create({
  timestampData: true,
  filename: dbStudentsPath,
});

const attendanceList = nedbPromises.create({
  timestampData: true,
  filename: dbAttendanceListPath,
});

const database = { students, attendanceList };

export { database };
