type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

interface Window {
  Main: {
    createStudent: (data: Omit<Student, '_id'>) => Promise<Student>;
    updateStudent: (data: Student) => Promise<Student>;
    getStudent: (data: { _id: string }) => Promise<Student>;
    getAllStudents: () => Promise<Student[]>;
    deleteStudent: (data: { _id: string }) => Promise<void>;

    createOrUpdateAttendanceList: (data: unknown) => Promise<unknown>;
    getAttendanceList: (date: string) => Promise<unknown>;
    getAllAttendanceListByMonth: (data: { month: string }) => Promise<unknown>;

    getWorkingDay: (data: { month: string }) => Promise<unknown>;
    createOrUpdateWorkingDays: (data: unknown) => Promise<unknown>;
  };
}
