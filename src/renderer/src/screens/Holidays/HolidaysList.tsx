import { Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { useHolidaysQuery } from '../../queries/useHolidaysQuery'
import { useCalendarViewDate } from '../../stores/useCalendarViewDate'
import { DeleteHolidayForm } from './DeleteHolidayForm'

export function HolidaysList() {
  const { data: holidays } = useHolidaysQuery()
  const [selectedDate] = useCalendarViewDate()

  const holidaysInSelectedMonth = useMemo(() => {
    return holidays?.filter((holiday) =>
      dayjs(selectedDate).isSame(holiday.date, 'month'),
    )
  }, [selectedDate, holidays])

  const monthAndYear = dayjs(selectedDate).format('MMM/YYYY')

  return (
    <VStack w="full" align="flex-start" gap="2">
      <Text>
        List de feriados para{' '}
        <Text as="span" fontWeight="bold" textTransform="uppercase">
          {monthAndYear}
        </Text>
      </Text>

      {holidaysInSelectedMonth &&
        holidaysInSelectedMonth?.map((holiday) => {
          return <DeleteHolidayForm key={holiday.id} holiday={holiday} />
        })}
    </VStack>
  )
}
