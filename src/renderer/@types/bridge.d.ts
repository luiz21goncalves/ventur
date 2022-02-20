type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
};

type AttendanceList = {
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

type WorkingDays = {
  _id: string;
  month: string;
  number_of_weeks: number;
  date: Date[];
};

interface Window {
  Main: {
    createStudent: (data: Omit<Student, '_id'>) => Promise<Student>;
    updateStudent: (data: Student) => Promise<Student>;
    getStudent: (data: { _id: string }) => Promise<Student>;
    getAllStudents: () => Promise<Student[]>;
    deleteStudent: (data: { _id: string }) => Promise<void>;

    createOrUpdateAttendanceList: (
      data: Omit<AttendanceList, '_id'>
    ) => Promise<AttendanceList>;
    getAttendanceList: (date: {
      year: string;
      month: string;
      day: string;
    }) => Promise<AttendanceList>;
    getAllAttendanceListByMonth: (data: {
      year: string;
      month: string;
    }) => Promise<AttendanceList[]>;

    getWorkingDayByMonth: (data: { month: string }) => Promise<WorkingDays>;
    createOrUpdateWorkingDays: (
      data: Omit<WorkingDays, '_id'>
    ) => Promise<WorkingDays>;
  };
}
