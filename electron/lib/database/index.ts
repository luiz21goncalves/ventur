import nedbPromises from 'nedb-promises';
import os from 'os';
import path from 'path';

const dbStudentsPath = path.resolve(
  os.homedir(),
  'ventur',
  'database',
  'students.db'
);

const students = nedbPromises.create({
  timestampData: true,
  filename: dbStudentsPath,
});

const database = { students };

export { database };
