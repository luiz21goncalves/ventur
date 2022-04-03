import { ipcRenderer } from 'electron';

type Student = {
  id: string;
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
  created_at: Date;
  updated_at: Date;
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
  created_at: Date;
  updated_at: Date;
};

export const api = {
  createStudent: (
    data: Omit<Student, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Student> => ipcRenderer.invoke('create-student', data),
  updateStudent: (
    data: Omit<Student, 'created_at' | 'updated_at'>,
  ): Promise<Student> => ipcRenderer.invoke('update-student', data),
  getStudent: (id: string): Promise<Student | null> =>
    ipcRenderer.invoke('find-student', id),
  getAllStudents: () => ipcRenderer.invoke('find-students'),
  deleteStudent: (id: string) => ipcRenderer.invoke('delete-student', id),

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
