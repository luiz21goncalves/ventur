import { Student } from '@/shared/types'

import { db, VenturDexie } from '../../lib/dexie'
import {
  CreateStudentData,
  StudentsRepository,
} from '../models/students-repository'

export class DexieStudentsRepository implements StudentsRepository {
  private repository: VenturDexie

  constructor() {
    this.repository = db
  }

  async create({
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
    birthdate,
    classes_per_week: classesPerWeek,
  }: CreateStudentData): Promise<Student> {
    const id = crypto.randomUUID()

    const student = {
      birthdate,
      classes_per_week: classesPerWeek,
      id,
      name,
      price_per_month_in_cents: pricePerMonthInCents,
      weekdays,
    }

    await this.repository.students.add(student)

    return student
  }

  async save({
    id,
    classes_per_week: classesPerWeek,
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
    birthdate,
  }: Student): Promise<Student> {
    await this.repository.students.update(id, {
      birthdate,
      classes_per_week: classesPerWeek,
      name,
      price_per_month_in_cents: pricePerMonthInCents,
      weekdays,
    })

    return {
      birthdate,
      classes_per_week: classesPerWeek,
      id,
      name,
      price_per_month_in_cents: pricePerMonthInCents,
      weekdays,
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.students.delete(id)
  }

  async findAll(): Promise<Student[]> {
    const students = await this.repository.students.toArray()

    return students
  }

  async findById(id: string): Promise<Student | undefined> {
    const student = await this.repository.students.get(id)

    return student
  }
}
