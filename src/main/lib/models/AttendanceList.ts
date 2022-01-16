import { database } from '../database';

import { Student } from '.';

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
    const attendanceList = await database.attendanceList.insert({
      year,
      month,
      day,
      students,
    });

    return attendanceList;
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
    const attendanceList = await database.attendanceList.findOne({
      year,
      month,
      day,
    });

    if (!attendanceList) {
      const students = await Student.findAll();

      return {
        students: students.map((findStudent) => ({
          _id: findStudent._id,
          name: findStudent.name,
          attendance: false,
        })),
      };
    }

    return attendanceList;
  },

  async update({
    _id,
    year,
    month,
    day,
    students,
  }: AttendanceListData & { _id: string }) {
    return database.attendanceList.update(
      { _id },
      { year, month, day, students }
    );
  },

  async findByMonth({ month }: { month: string }) {
    return database.attendanceList.find({
      month,
    });
  },
};
