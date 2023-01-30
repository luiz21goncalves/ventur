import Dexie, { Table } from 'dexie'

type Holiday = {
  id?: number
  name: string
  date: string
}

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
