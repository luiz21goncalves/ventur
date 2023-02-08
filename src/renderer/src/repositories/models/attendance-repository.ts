import { Attendance } from '@/shared/types'

export type CreateAttendanceData = Pick<
  Attendance,
  'date' | 'presence' | 'student_id'
>
export type FindByDateAndStudentIdData = {
  date: string
  student_id: string
}
export type FindByStudentIdAndMonthData = {
  date: string
  student_id: string
}

export type AttendanceRepository = {
  create(data: CreateAttendanceData): Promise<Attendance>
  save(attendance: Attendance): Promise<Attendance>
  findByDateAndStudentId(
    data: FindByDateAndStudentIdData,
  ): Promise<Attendance | undefined>
  findByStudentIdAndMonth(
    data: FindByStudentIdAndMonthData,
  ): Promise<Attendance[]>
}
