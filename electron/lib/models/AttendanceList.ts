import { database } from '../database';

type AttendanceListData = {
  date: string;
  students: {
    [key: string]: boolean;
  };
};

export const AttendanceList = {
  async create({ date, students }: AttendanceListData) {
    const attendanceList = await database.attendanceList.insert({
      date,
      students,
    });

    console.log(attendanceList);

    return attendanceList;
  },
};
