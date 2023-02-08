import dayjs from 'dayjs'

import { Attendance } from '@/shared/types'

import { db, VenturDexie } from '../../lib/dexie'
import {
  AttendanceRepository,
  CreateAttendanceData,
  FindByDateAndStudentIdData,
  FindByStudentIdAndMonthData,
} from '../models/attendance-repository'

export class DexieAttendanceRepository implements AttendanceRepository {
  private repository: VenturDexie

  constructor() {
    this.repository = db
  }

  async save({
    date,
    id,
    presence,
    student_id: studentId,
  }: Attendance): Promise<Attendance> {
    await this.repository.attendance.update(id, {
      date,
      presence,
      student_id: studentId,
    })

    return {
      date,
      id,
      presence,
      student_id: studentId,
    }
  }

  async create({
    date,
    presence,
    student_id: studentId,
  }: CreateAttendanceData): Promise<Attendance> {
    const id = crypto.randomUUID()

    const attendance = { date, id, presence, student_id: studentId }

    await this.repository.attendance.add(attendance)

    return attendance
  }

  async findByDateAndStudentId({
    date,
    student_id: studentId,
  }: FindByDateAndStudentIdData): Promise<Attendance | undefined> {
    const attendace = await this.repository.attendance.get({
      date,
      student_id: studentId,
    })

    return attendace
  }

  async findByStudentIdAndMonth({
    date,
    student_id: studentId,
  }: FindByStudentIdAndMonthData): Promise<Attendance[]> {
    const parsedDate = dayjs(date)
    const firstDayOfMonth = parsedDate.startOf('month').toISOString()
    const lastDayOfMonth = parsedDate.endOf('month').toISOString()

    const attendances = await this.repository.attendance
      .where('date')
      .between(firstDayOfMonth, lastDayOfMonth)
      .and((attendance) => {
        return attendance.student_id === studentId && attendance.presence
      })
      .sortBy('date')

    return attendances
  }
}
