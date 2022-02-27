import { ipcRenderer } from 'electron';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
  createdAt: Date;
  updatedAt: Date;
};

type AttendanceList = {
  _id: string;
  year: string;
  month: string;
  day: string;
  students: {
    _id: string;
    name: string;
    attendance: 'true' | 'false';
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export const api = {
  createStudent: (
    data: Omit<Student, '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Student> => ipcRenderer.invoke('create-student', data),
  updateStudent: (
    data: Omit<Student, 'createdAt' | 'updatedAt'>,
  ): Promise<Student> => ipcRenderer.invoke('update-student', data),
  getStudent: (data: { _id: string }): Promise<Student | null> =>
    ipcRenderer.invoke('find-student', data),
  getAllStudents: () => ipcRenderer.invoke('find-students'),
  deleteStudent: (data: { _id: string }) =>
    ipcRenderer.invoke('delete-student', data),

  createOrUpdateAttendanceList: (data: {
    day: string;
    month: string;
    year: string;
    students: { _id: string; name: string; attendance: string }[];
  }) => ipcRenderer.invoke('create-attendance-list', data),
  getAttendanceList: (data: {
    day: string;
    month: string;
    year: string;
  }): Promise<AttendanceList> =>
    ipcRenderer.invoke('find-attendance-list', data),
  getAllAttendanceListByMonth: (data: {
    month: string;
    year: string;
  }): Promise<AttendanceList[]> =>
    ipcRenderer.invoke('find-attendance-list-by-month', data),

  getWorkingDayByMonth: (data: { month: string }) =>
    ipcRenderer.invoke('find-working-days-by-month', data),
  createOrUpdateWorkingDays: (data: {
    month: string;
    number_of_weeks: number;
    date: Date[];
  }) => ipcRenderer.invoke('create-working-days', data),
};
