import { Holiday } from '@/shared/types'

export type CreateHolidayData = Pick<Holiday, 'date' | 'name'>

export type HolidaysRepository = {
  create(data: CreateHolidayData): Promise<Holiday>
  delete(id: string): Promise<void>
  findByYear(year: number): Promise<Holiday[]>
}
