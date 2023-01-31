import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'

import { api } from '../lib/api'
import { db } from '../lib/dexie'
import { useCalendarViewDate } from '../stores/useCalendarViewDate'

type HolidaysResponse = {
  date: string
  name: string
}

async function getOrFetchHolidays(
  context: QueryFunctionContext<[string, number]>,
) {
  const [, year] = context.queryKey

  const parseDate = dayjs().set('year', year)
  const firstDayOfYear = parseDate.startOf('year').toISOString()
  const lastDayOfYear = parseDate.endOf('year').toISOString()

  const storedHolidays = await db.holidays
    .where('date')
    .between(firstDayOfYear, lastDayOfYear)
    .toArray()

  const hasHolidaysStoredInYear = storedHolidays.length > 0

  if (hasHolidaysStoredInYear) {
    return storedHolidays
  }

  const { data } = await api<HolidaysResponse[]>(`/feriados/v1/${year}`)

  for await (const holidayResponse of data) {
    await db.holidays.add({
      date: dayjs(holidayResponse.date).toISOString(),
      name: holidayResponse.name,
    })
  }

  const savedHolidays = await db.holidays
    .where('date')
    .between(firstDayOfYear, lastDayOfYear)
    .toArray()

  return savedHolidays
}

export function useHolidaysQuery() {
  const [selectedDate] = useCalendarViewDate()

  const year = dayjs(selectedDate).get('year')

  return useQuery({
    queryFn: getOrFetchHolidays,
    queryKey: [QUERIES.HOLIDAYS.FETCH_ALL, year],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
