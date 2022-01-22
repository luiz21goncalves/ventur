import { database } from '../database';

type StudentData = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: string;
  price_per_month: string;
};

export const Student = {
  async create({
    name,
    email,
    password,
    classes_per_week,
    price_per_month,
  }: Omit<StudentData, '_id'>) {
    return database.students.insert({
      name,
      email,
      password,
      classes_per_week: Number(classes_per_week),
      price_per_month: Number(price_per_month),
    });
  },

  async update({
    _id,
    name,
    email,
    password,
    classes_per_week,
    price_per_month,
  }: StudentData) {
    await database.students.update(
      { _id },
      {
        name,
        email,
        password,
        classes_per_week: Number(classes_per_week),
        price_per_month: Number(price_per_month),
      }
    );

    return database.students.findOne({ _id });
  },

  async find({ _id }: { _id: string }) {
    return database.students.findOne({ _id });
  },

  async findAll() {
    return database.students.find({}).sort({ name: 1 });
  },

  async delete({ _id }: { _id: string }) {
    return database.students.remove({ _id }, { multi: false });
  },
};
