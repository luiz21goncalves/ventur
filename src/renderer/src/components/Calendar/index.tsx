import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Table,
  Tbody,
} from '@chakra-ui/react'
import dayjs, { Dayjs } from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'

import { getMonthDays } from '../../utils/get-month-data'
import { Week } from './Week'
import { Weekdays } from './Weekdays'

type CalendarWeek = {
  week: number
  days: Array<{ date: Dayjs; disabled: boolean }>
}

type CalendarWeeks = CalendarWeek[]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs()
  })

  const calendarWeeks = useMemo(() => {
    const currentMonth = getMonthDays(currentDate.toDate())

    const firstDayInCurrentMonth = currentMonth.days[0]
    const lastDayInCurrentMonth = currentMonth.days[currentMonth.daysAmount - 1]

    const firstWeekDay = firstDayInCurrentMonth.get('day')
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonth = getMonthDays(
      firstDayInCurrentMonth.add(1, 'month').toDate(),
    )
    const previousMonth = getMonthDays(
      firstDayInCurrentMonth.subtract(1, 'month').toDate(),
    )

    const previousMonthFillArray = previousMonth.days
      .slice(previousMonth.daysAmount - firstWeekDay)
      .map((date) => {
        return { date, disabled: true }
      })

    const nextMonthFillArray = nextMonth.days
      .slice(0, 7 - (lastWeekDay + 1))
      .map((date) => {
        return { date, disabled: true }
      })

    const formattedCurrentMonth = currentMonth.days.map((date) => {
      return {
        date,
        disabled: false,
      }
    })

    const calendarDays = [
      ...previousMonthFillArray,
      ...formattedCurrentMonth,
      ...nextMonthFillArray,
    ]

    const formatedCalendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            days: original.slice(index, index + 7),
            week: index / 7 + 1,
          })
        }

        return weeks
      },
      [],
    )

    return formatedCalendarWeeks
  }, [currentDate])

  const monthName = currentDate.format('MMMM')
  const yearLabel = currentDate.get('year')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'months')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'months')

    setCurrentDate(nextMonthDate)
  }

  return (
    <Flex direction="column">
      <HStack w="full" justify="space-between" align="center" mb="6">
        <Heading textTransform="capitalize" size="lg">
          {monthName} {yearLabel}
        </Heading>

        <HStack>
          <IconButton
            aria-label="Previous month"
            icon={<CaretLeft size={20} weight="bold" />}
            onClick={handlePreviousMonth}
          />
          <IconButton
            aria-label="Next month"
            icon={<CaretRight size={20} weight="bold" />}
            onClick={handleNextMonth}
          />
        </HStack>
      </HStack>

      <Table layout="fixed" variant="unstyled">
        <Weekdays />

        <Tbody w="full">
          {calendarWeeks.map(({ days, week }) => {
            return <Week key={week} days={days} />
          })}
        </Tbody>
      </Table>
    </Flex>
  )
}
