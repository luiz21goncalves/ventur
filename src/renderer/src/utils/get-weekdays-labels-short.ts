import { getWeekdays } from './get-weekdays'
import { verifyIsValidWeekdayArray } from './verify-is-valid-weekday-array'

const { short } = getWeekdays()

export function getWeekdaysLabelsShort(weekdaysArray: number[]): string[] {
  const hasValidWeekdays = verifyIsValidWeekdayArray(weekdaysArray)

  if (hasValidWeekdays) {
    const formattedWeekdays = weekdaysArray.map(
      (weekdayIndex) => short[weekdayIndex],
    )

    return formattedWeekdays
  }

  return []
}
