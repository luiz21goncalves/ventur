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

import { Holiday } from '@/shared/types'

import { useHolidaysQuery } from '../../queries/useHolidaysQuery'
import { getMonthDays } from '../../utils/get-month-data'
import { Week } from './Week'
import { Weekdays } from './Weekdays'

type CalendarWeek = {
  week: number
  days: Array<{ date: Dayjs; disabled: boolean; isHoliday: boolean }>
}

type CalendarWeeks = CalendarWeek[]

function checkIfIsHoliday(holidays: Holiday[], date: Dayjs) {
  const holiday = holidays.find((holiday) => {
    return date.isSame(holiday.date, 'day')
  })

  return Boolean(holiday)
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs()
  })
  const { data: holidays } = useHolidaysQuery()

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
        const isHoliday = checkIfIsHoliday(holidays ?? [], date)

        return { date, disabled: true, isHoliday }
      })

    const nextMonthFillArray = nextMonth.days
      .slice(0, 7 - (lastWeekDay + 1))
      .map((date) => {
        const isHoliday = checkIfIsHoliday(holidays ?? [], date)

        return { date, disabled: true, isHoliday }
      })

    const formattedCurrentMonth = currentMonth.days.map((date) => {
      const isHoliday = checkIfIsHoliday(holidays ?? [], date)

      return {
        date,
        disabled: false,
        isHoliday,
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
  }, [currentDate, holidays])

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
