import { Student } from '@/shared/types'

export type CreateStudentData = Pick<
  Student,
  | 'name'
  | 'birthdate'
  | 'price_per_month_in_cents'
  | 'weekdays'
  | 'classes_per_week'
>

export type StudentsRepository = {
  create(data: CreateStudentData): Promise<Student>
  save(data: Student): Promise<Student>
  delete(id: string): Promise<void>
  findAll(): Promise<Student[]>
  findById(id: string): Promise<Student | undefined>
}
