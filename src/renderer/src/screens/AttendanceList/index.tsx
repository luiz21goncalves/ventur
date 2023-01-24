import {
  Center,
  Divider,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

import { InputDate } from '../../components/Inputs/InputDate'
import { studentFactory } from '../../factories/student.factory'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

const students = studentFactory.buildList(6)

export function AttendanceList() {
  const [selectedDate] = useCalendarSelectedDate()

  const fullDateFormatted = dayjs(selectedDate).format(
    'dddd[, ] DD [ de ] MMMM [ de ] YYYY',
  )

  return (
    <VStack gap="8">
      <Center>
        <InputDate />
      </Center>

      <Heading size="sm" textTransform="uppercase">
        {fullDateFormatted}
      </Heading>

      <VStack w="360px" gap="4">
        {students.map((student, index, originalArray) => {
          const isChecked = Math.round(Math.random() * 2) % 2 === 0
          const isNotLastRow = !(originalArray.length - 1 === index)

          return (
            <VStack key={student.id} gap="1" w="full">
              <HStack w="full" justifyContent="space-between">
                <Text>{student.name}, teve aula?</Text>

                <Switch size="lg" defaultChecked={isChecked} />
              </HStack>

              {isNotLastRow && <Divider colorScheme="blackAlpha" />}
            </VStack>
          )
        })}
      </VStack>
    </VStack>
  )
}
