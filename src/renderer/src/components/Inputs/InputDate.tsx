import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ChangeEvent } from 'react'

import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

export function InputDate() {
  const [selectedDate, setSelectedDate] = useCalendarSelectedDate()

  const formatedDate = dayjs(selectedDate).format('YYYY-MM-DD')

  function handleChangeDate(event: ChangeEvent<HTMLInputElement>) {
    const date = dayjs(event.target.value).toDate()

    setSelectedDate(date)
  }

  return (
    <InputGroup maxW="80">
      <InputLeftAddon>Data de referencia</InputLeftAddon>
      <Input
        type="date"
        maxW="40"
        defaultValue={formatedDate}
        onChange={handleChangeDate}
      />
    </InputGroup>
  )
}
