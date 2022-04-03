import crypto from 'crypto';

import { openDb } from '../database/sqlite';

type StudentData = {
  id: string;
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
};

export const Student = {
  async create({
    name,
    email,
    password,
    birthday,
    classes_per_week,
    price_per_month,
  }: Omit<StudentData, 'id'>) {
    const db = await openDb();

    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();

    await db.run(
      `
        INSERT INTO students (id, name, email, password, birthday, classes_per_week, price_per_month, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
        datetime,
        datetime,
      ],
    );

    return this.findById(id);
  },

  async update({
    id,
    name,
    email,
    password,
    birthday,
    classes_per_week,
    price_per_month,
  }: StudentData) {
    const db = await openDb();

    const datetime = new Date().toISOString();

    await db.run(
      `
      UPDATE students
      SET name = ?, email = ?, password = ?, birthday = ?, classes_per_week = ?, price_per_month = ?, updated_at = ?
      WHERE id = ?
    `,
      [
        name,
        email,
        password,
        birthday,
        classes_per_week,
        price_per_month,
        datetime,
        id,
      ],
    );

    return this.findById(id);
  },

  async findById(id: string) {
    const db = await openDb();

    return db.get('SELECT * FROM students WHERE id = ?', [id]);
  },

  async findAll() {
    const db = await openDb();

    return db.all('SELECT * FROM students ORDER BY name ASC');
  },

  async delete(id: string) {
    const db = await openDb();

    return db.run('DELETE FROM students WHERE id = ?', [id]);
  },
};
