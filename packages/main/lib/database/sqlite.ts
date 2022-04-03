import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { app } from 'electron';

sqlite3.verbose();

const dbPath = app.isPackaged
  ? path.join(app.getPath('home'), 'ventur/database/ventur.db')
  : path.join(__dirname, '../../dev.db');

const migrationsPath = app.isPackaged
  ? path.join(process.resourcesPath, 'migrations')
  : path.join(__dirname, '../../migrations');

export async function openDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.migrate({
    migrationsPath,
  });

  return db;
}
