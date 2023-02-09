import dayjs from 'dayjs'

import { calculatePossibleClassDays } from './calculate-possible-class-days'
import { removeDuplicateDates } from './remove-duplicate-dates'
import { verifyIsValidWeekdayArray } from './verify-is-valid-weekday-array'

type CalculateMonthlyParams = {
  holidays: string[]
  classDays: string[]
  weekdays: number[]
  pricePerMonthInCents: number
  referenceDate: Date
}

export function calculateMonthlyPayment(
  params: CalculateMonthlyParams,
): number {
  const { classDays, holidays, weekdays, pricePerMonthInCents, referenceDate } =
    params

  const uniqueClassDays = removeDuplicateDates(classDays)

  const hasInvalidParams =
    classDays.length <= 0 || weekdays.length <= 0 || uniqueClassDays.length <= 0

  if (hasInvalidParams) {
    return 0
  }

  const hasInvalidWeekday = !verifyIsValidWeekdayArray(weekdays)

  if (hasInvalidWeekday) {
    return 0
  }

  const hasInvalidPrice = pricePerMonthInCents <= 0

  if (hasInvalidPrice) {
    return 0
  }

  const firstMonthDay = dayjs(referenceDate).startOf('month')

  const hasInvalidClassDays = classDays.some(
    (classDay) => !firstMonthDay.isSame(classDay, 'month'),
  )

  if (hasInvalidClassDays) {
    return 0
  }

  const possibleClassDays = calculatePossibleClassDays({
    date: referenceDate,
    weekdays,
  })

  const formattedPossibleClassDays = removeDuplicateDates(
    possibleClassDays.map((date) => date.toISOString()),
  )

  const hasHoliday = holidays.length > 0

  let possibleClassDaysWithoutHolidays: string[] = []

  if (hasHoliday) {
    const uniqueHoliday = removeDuplicateDates(holidays)

    formattedPossibleClassDays.forEach((possibleClassDay) => {
      if (!uniqueHoliday.includes(possibleClassDay)) {
        possibleClassDaysWithoutHolidays.push(possibleClassDay)
      }
    })
  } else {
    possibleClassDaysWithoutHolidays = formattedPossibleClassDays
  }

  const totalNumberOfPossibleClasses = possibleClassDaysWithoutHolidays.length
  const totalNumberOfClasses = uniqueClassDays.length

  const pricePerClassInCents =
    pricePerMonthInCents / totalNumberOfPossibleClasses
  const pricePayableInCents = pricePerClassInCents * totalNumberOfClasses

  return pricePayableInCents
}
