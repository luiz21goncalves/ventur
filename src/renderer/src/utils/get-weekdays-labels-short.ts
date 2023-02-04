import { getWeekdays } from './get-weekdays'

const { short } = getWeekdays()

export function getWeekdaysLabelsShort(weekdaysArray: number[]): string[] {
  const hasInvalidLength = weekdaysArray.length > 7

  if (hasInvalidLength) {
    return []
  }

  const hasAnInvalidWeekdayArray = weekdaysArray.some((weekdayIndex) => {
    const isInvalidWeekday = weekdayIndex > 0 && weekdayIndex > 6

    return isInvalidWeekday
  })

  if (hasAnInvalidWeekdayArray) {
    return []
  }

  const formattedWeekdays = weekdaysArray.map(
    (weekdayIndex) => short[weekdayIndex],
  )

  return formattedWeekdays
}
