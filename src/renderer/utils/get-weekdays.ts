type Weekday = {
  long: Array<string>
  short: Array<string>
}

export function getWeekdays() {
  const formatterLong = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
  const formatterShort = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })

  const weekdaysIterator = Array(7).keys()

  const { long, short } = Array.from(weekdaysIterator).reduce(
    (weekdaysResponseObject, day) => {
      const targetDate = new Date(Date.UTC(2021, 5, day))

      const weekdayLong = formatterLong.format(targetDate)
      const weekdayShort = formatterShort.format(targetDate).replace('.', '')

      weekdaysResponseObject.long.push(weekdayLong)
      weekdaysResponseObject.short.push(weekdayShort)

      return weekdaysResponseObject
    },
    { long: [], short: [] } as Weekday,
  )

  return { long, short }
}
