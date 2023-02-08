export function verifyIsValidWeekdayArray(weekdays: number[]) {
  const hasInvalidLength = weekdays.length > 7

  if (hasInvalidLength) {
    return false
  }

  const hasAnInvalidWeekdayArray = weekdays.some((weekdayIndex) => {
    const isInvalidWeekday = weekdayIndex > 0 && weekdayIndex > 6

    return isInvalidWeekday
  })

  if (hasAnInvalidWeekdayArray) {
    return false
  }

  return true
}
