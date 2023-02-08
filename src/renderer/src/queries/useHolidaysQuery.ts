import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'
import { Holiday } from '@/shared/types'

import { api } from '../lib/api'
import { dexieHolidaysRepository } from '../repositories/implementations'
import { useCalendarViewDate } from '../stores/useCalendarViewDate'

type HolidaysResponse = {
  date: string
  name: string
}

async function getOrFetchHolidays(
  context: QueryFunctionContext<[string, number]>,
) {
  const [, year] = context.queryKey

  const storedHolidays = await dexieHolidaysRepository.findByYear(year)

  const hasHolidaysStoredInYear = storedHolidays.length > 0

  if (hasHolidaysStoredInYear) {
    return storedHolidays
  }

  const { data } = await api<HolidaysResponse[]>(`/feriados/v1/${year}`)

  const holidays: Holiday[] = []

  for await (const holidayResponse of data) {
    const formatedDate = dayjs(holidayResponse.date)
      .startOf('date')
      .toISOString()

    const holiday = await dexieHolidaysRepository.create({
      date: formatedDate,
      name: holidayResponse.name,
    })

    holidays.push(holiday)
  }

  return holidays
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
