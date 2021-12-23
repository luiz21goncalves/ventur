import { database } from '../database';

type StudentData = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

export const Student = {
  async create({
    name,
    email,
    password,
    classes_per_week,
    price_per_month,
  }: Omit<StudentData, '_id'>) {
    const student = await database.students.insert({
      name,
      email,
      password,
      classes_per_week,
      price_per_month,
    });

    return student;
  },

  async find(id: string) {
    const student = await database.students.findOne({ _id: id });

    return student;
  },

  async findAll() {
    const students = await database.students.find({});

    return students;
  },
};
