import { database } from '../database';

import { Student } from '.';

type AttendanceListData = {
  date: string;
  students: {
    _id: string;
    name: string;
    attendance: string;
  }[];
};

export const AttendanceList = {
  async create({ date, students }: AttendanceListData) {
    const attendanceList = await database.attendanceList.insert({
      date,
      students,
    });

    return attendanceList;
  },

  async findByDate(date: string) {
    const attendanceList = await database.attendanceList.findOne({ date });

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

  async update({ _id, date, students }: AttendanceListData & { _id: string }) {
    return database.attendanceList.update({ _id }, { date, students });
  },
};
