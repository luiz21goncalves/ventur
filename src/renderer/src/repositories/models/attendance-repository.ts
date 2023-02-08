import { Attendance } from '@/shared/types'

export type CreateAttendanceData = Pick<
  Attendance,
  'date' | 'presence' | 'student_id'
>
export type FindByDateAndStudentIdData = Pick<Attendance, 'date' | 'student_id'>

export type AttendanceRepository = {
  create(data: CreateAttendanceData): Promise<Attendance>
  save(attendance: Attendance): Promise<Attendance>
  findByDateAndStudentId(
    data: FindByDateAndStudentIdData,
  ): Promise<Attendance | undefined>
}
