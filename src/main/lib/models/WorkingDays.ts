import { database } from '../database';

type WorkingDaysData = {
  _id: string;
  month: string;
  number_of_weeks: number;
  date: Date[];
};

export const WorkingDays = {
  async create({ month, number_of_weeks, date }: Omit<WorkingDaysData, '_id'>) {
    return database.workingDays.insert({ month, number_of_weeks, date });
  },

  async findByMonth({ month }: Pick<WorkingDaysData, 'month'>) {
    const result = await database.workingDays.findOne({ month });

    return result;
  },

  async update({ _id, month, number_of_weeks, date }: WorkingDaysData) {
    return database.workingDays.update(
      { _id },
      { month, number_of_weeks, date }
    );
  },
};
