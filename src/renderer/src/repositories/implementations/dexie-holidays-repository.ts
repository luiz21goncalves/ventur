import dayjs from 'dayjs'

import { Holiday } from '@/shared/types'

import { db, VenturDexie } from '../../lib/dexie'
import {
  CreateHolidayData,
  HolidaysRepository,
} from '../models/holidays-repository'

export class DexieHolidaysRepository implements HolidaysRepository {
  private repository: VenturDexie

  constructor() {
    this.repository = db
  }

  async create({ date, name }: CreateHolidayData): Promise<Holiday> {
    const id = crypto.randomUUID()

    const holiday = {
      date,
      id,
      name,
    }

    await this.repository.holidays.add(holiday)

    return holiday
  }

  async delete(id: string): Promise<void> {
    await this.repository.holidays.delete(id)
  }

  async findByYear(year: number): Promise<Holiday[]> {
    const date = dayjs().set('year', year)
    const firstDayOfYear = date.startOf('year').toISOString()
    const lastDayOfYear = date.endOf('year').toISOString()

    const holidays = await this.repository.holidays
      .where('date')
      .between(firstDayOfYear, lastDayOfYear)
      .toArray()

    return holidays
  }
}
