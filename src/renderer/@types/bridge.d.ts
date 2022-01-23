type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

type AttendanceListData = {
  _id: string;
  year: number;
  month: number;
  day: number;
  students: {
    _id: string;
    name: string;
    attendance: string;
  }[];
};

interface Window {
  Main: {
    createStudent: (data: Omit<Student, '_id'>) => Promise<Student>;
    updateStudent: (data: Student) => Promise<Student>;
    getStudent: (data: { _id: string }) => Promise<Student>;
    getAllStudents: () => Promise<Student[]>;
    deleteStudent: (data: { _id: string }) => Promise<void>;

    createOrUpdateAttendanceList: (
      data: Omit<AttendanceListData, '_id'>
    ) => Promise<AttendanceListData>;
    getAttendanceList: (date: {
      year: string;
      month: string;
      day: string;
    }) => Promise<AttendanceListData>;
    getAllAttendanceListByMonth: (data: {
      year: string;
      month: string;
    }) => Promise<AttendanceListData[]>;

    getWorkingDay: (data: { month: string }) => Promise<unknown>;
    createOrUpdateWorkingDays: (data: unknown) => Promise<unknown>;
  };
}
