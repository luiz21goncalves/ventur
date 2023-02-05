import Dexie, { Table } from 'dexie'

import { Attendance, Holiday, Student } from '@/shared/types'

class VenturDexie extends Dexie {
  holidays!: Table<Holiday>
  students!: Table<Student>
  attendance!: Table<Attendance>

  constructor() {
    // TODO: rename this db
    super('test')

    this.version(3).stores({
      attendance: '++id, date, student_id, presence, [date+student_id]',
      holidays: '++id, name, date',
      students:
        '++id, name, birthdate, classes_per_week, price_per_month, *weekdays',
    })
  }
}

export const db = new VenturDexie()
