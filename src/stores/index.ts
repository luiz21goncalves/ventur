import create from 'zustand';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

export const useStudentData = create<Student>(() => ({} as Student));
