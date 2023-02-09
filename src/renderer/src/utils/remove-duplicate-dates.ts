import dayjs from 'dayjs'

export function removeDuplicateDates(dates: string[]): string[] {
  const datesInStartOfDay = dates.map((date) => {
    return dayjs(date).startOf('date').toISOString()
  })

  const uniqueDates = datesInStartOfDay.reduce<string[]>(
    (uniqueDatesArray, date) => {
      if (!uniqueDatesArray.includes(date)) {
        uniqueDatesArray.push(date)
      }

      return uniqueDatesArray
    },
    [],
  )

  return uniqueDates
}
