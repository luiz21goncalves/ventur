import crypto from 'crypto';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

import { database } from '../database';
import { openDb } from '../database/sqlite';

type WorkingDaysData = {
  id: string;
  month: string;
  number_of_weeks: number;
  date: Date[];
};

export const WorkingDays = {
  async create({ month, number_of_weeks, date }: Omit<WorkingDaysData, 'id'>) {
    const db = await openDb();

    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();

    await db.run(
      `
      INSERT INTO working_days (
        id,
        month,
        number_of_weeks,
        date,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `,
      [id, month, number_of_weeks, date, datetime, datetime],
    );

    return this.findById(id);
  },

  async findById(id: string) {
    const db = await openDb();

    return db.get(`SELECT * FROM working_days WHERE id = ?`, [id]);
  },

  async findByDate(date: Date) {
    const db = await openDb();

    const month = getMonth(date);
    const year = getYear(date);

    console.log(month, year);

    return database.workingDays.findOne({ month: Number(month) });
  },

  async update({ id, month, number_of_weeks, date }: WorkingDaysData) {
    return database.workingDays.update(
      { _id },
      { month: Number(month), number_of_weeks, date },
    );
  },
};
