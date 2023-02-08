import dayjs from 'dayjs'

import { getMonthDays } from './get-month-data'
import { verifyIsValidWeekdayArray } from './verify-is-valid-weekday-array'

type CalculatePossibleClassDaysParams = {
  weekdays: number[]
  date: Date
}

export function calculatePossibleClassDays(
  params: CalculatePossibleClassDaysParams,
): Date[] {
  const { date, weekdays } = params

  const hasValidWeekdays = verifyIsValidWeekdayArray(weekdays)

  if (hasValidWeekdays) {
    const { days: currentMonthDays } = getMonthDays(dayjs(date).toDate())

    const filteredDaysPerWeekday = currentMonthDays.reduce<Date[]>(
      (filteredDays, day) => {
        const weekday = day.get('day')

        if (weekdays.includes(weekday)) {
          filteredDays.push(day.toDate())
        }

        return filteredDays
      },
      [],
    )

    return filteredDaysPerWeekday
  }

  return []
}
