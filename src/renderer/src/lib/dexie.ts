import Dexie, { Table } from 'dexie'

import { Holiday, Student } from '@/shared/types'

class VenturDexie extends Dexie {
  holidays!: Table<Holiday>
  students!: Table<Student>

  constructor() {
    // TODO: rename this db
    super('test')

    this.version(2).stores({
      holidays: '++id, name, date',
      students:
        '++id, name, birthdate, classes_per_week, price_per_month, *weekdays',
    })
  }
}

export const db = new VenturDexie()
