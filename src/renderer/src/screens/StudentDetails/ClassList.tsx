import { Box, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'
import { capitalize } from '../../utils/capitalize'

export function ClassList() {
  const [selectedDate] = useCalendarSelectedDate()

  const monthAndYear = capitalize(dayjs(selectedDate).format('MMMM/YYYY'))

  return (
    <Box>
      <Text mb="2">Aulas de {monthAndYear}</Text>

      <VStack h="80" overflowY="scroll" pr="2" alignItems="flex-start">
        {Array.from({ length: 20 }).map((_, index) => {
          const lineNumber = index + 1
          const date = new Date().toDateString()

          return (
            <Text key={lineNumber}>
              {lineNumber}: {date}
            </Text>
          )
        })}
      </VStack>
    </Box>
  )
}
