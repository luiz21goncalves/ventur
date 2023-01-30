import Dexie, { Table } from 'dexie'

import { Holiday } from '@/shared/types'

class VenturDexie extends Dexie {
  holidays!: Table<Holiday>

  constructor() {
    // TODO: rename this db
    super('test')

    this.version(1).stores({
      holidays: '++id, name, date',
    })
  }
}

export const db = new VenturDexie()
