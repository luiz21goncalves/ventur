import dayjs, { Dayjs } from 'dayjs'

type Month = {
  days: Dayjs[]
  daysAmount: number
}

export function getMonthDays(currentDate: Date): Month {
  const firstDayInCurrentMonth = dayjs(currentDate).set('date', 1)
  const daysAmount = firstDayInCurrentMonth.daysInMonth()

  const days = Array.from({
    length: daysAmount,
  }).map((_, index) => {
    return firstDayInCurrentMonth.set('date', index + 1)
  })

  return { days, daysAmount }
}
