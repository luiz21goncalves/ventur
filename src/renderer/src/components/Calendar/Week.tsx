import { AspectRatio, Td, Tr } from '@chakra-ui/react'
import { Dayjs } from 'dayjs'
import { useId } from 'react'

import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'
import { DayInput } from './DayInput'

type WeekProps = {
  days: Array<{ date: Dayjs; disabled: boolean; isHoliday: boolean }>
}

export function Week(props: WeekProps) {
  const { days } = props

  const id = useId()
  const [selectedDate, setSelectedDate] = useCalendarSelectedDate()

  return (
    <Tr>
      {days.map(({ date, disabled, isHoliday }) => {
        const key = `${id}-${date.toISOString()}`
        const day = date.get('date')
        const isSelected = date.isSame(selectedDate, 'day')

        function handleSelectDate() {
          setSelectedDate(date.toDate())
        }

        return (
          <Td key={key} px="none" py="none">
            <AspectRatio w="full" ratio={1}>
              <DayInput
                isChecked={isSelected}
                isDisabled={disabled}
                onChange={handleSelectDate}
                isHoliday={isHoliday}
              >
                {day}
              </DayInput>
            </AspectRatio>
          </Td>
        )
      })}
    </Tr>
  )
}
