import { database } from '../database';

type WorkingDaysData = {
  _id: string;
  month: string;
  number_of_weeks: number;
  date: Date[];
};

export const WorkingDays = {
  async create({ month, number_of_weeks, date }: Omit<WorkingDaysData, '_id'>) {
    return database.workingDays.insert({
      month: Number(month),
      number_of_weeks,
      date,
    });
  },

  async findByMonth({ month }: Pick<WorkingDaysData, 'month'>) {
    return database.workingDays.findOne({ month: Number(month) });
  },

  async update({ _id, month, number_of_weeks, date }: WorkingDaysData) {
    return database.workingDays.update(
      { _id },
      { month: Number(month), number_of_weeks, date },
    );
  },
};
