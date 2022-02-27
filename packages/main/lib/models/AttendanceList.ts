import { database } from '../database';

type AttendanceListData = {
  year: string;
  month: string;
  day: string;
  students: {
    _id: string;
    name: string;
    attendance: string;
  }[];
};

export const AttendanceList = {
  async create({ year, month, day, students }: AttendanceListData) {
    return database.attendanceList.insert({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      students,
    });
  },

  async findByDate({
    year,
    month,
    day,
  }: {
    year: string;
    month: string;
    day: string;
  }) {
    return database.attendanceList.findOne({
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });
  },

  async update({
    _id,
    year,
    month,
    day,
    students,
  }: AttendanceListData & { _id: string }) {
    await database.attendanceList.update(
      { _id },
      { year: Number(year), month: Number(month), day: Number(day), students },
    );

    return database.attendanceList.findOne({ _id });
  },

  async findByMonth({ month, year }: { year: string; month: string }) {
    return database.attendanceList.find({
      month: Number(month),
      year: Number(year),
    });
  },
};
