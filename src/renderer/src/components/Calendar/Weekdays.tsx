import { Heading, Th, Thead, Tr } from '@chakra-ui/react'
import { useId } from 'react'

import { getWeekdays } from '../../utils/get-weekdays'

const weekdays = getWeekdays()

export function Weekdays() {
  const id = useId()

  return (
    <Thead>
      <Tr>
        {weekdays.short.map((weekday) => {
          return (
            <Th key={`${id}-${weekday}`}>
              <Heading size="xs">{weekday}</Heading>
            </Th>
          )
        })}
      </Tr>
    </Thead>
  )
}
