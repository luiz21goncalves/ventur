import { Attendance } from '@/shared/types'

import { db, VenturDexie } from '../../lib/dexie'
import {
  AttendanceRepository,
  CreateAttendanceData,
  FindByDateAndStudentIdData,
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
}
