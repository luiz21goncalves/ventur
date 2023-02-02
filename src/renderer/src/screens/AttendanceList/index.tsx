import { Button, Divider, Flex, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import { Student } from '@/shared/types'

import { studentFactory } from '../../factories/student.factory'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'
import { StudentList } from './StudentList'

const students = studentFactory.buildList(6)

export function AttendanceList() {
  const [selectedDate] = useCalendarSelectedDate()

  const fullDateFormatted = dayjs(selectedDate).format(
    'dddd[, ] DD [ de ] MMMM [ de ] YYYY',
  )

  const { studentsWithClassOnWeekday, studentsWithoutClassOnWeekday } =
    useMemo(() => {
      const weekday = dayjs(selectedDate).get('day')

      return students.reduce<{
        studentsWithClassOnWeekday: Student[]
        studentsWithoutClassOnWeekday: Student[]
      }>(
        (acc, student) => {
          const hasClassOnWeekday = student.weekdays.includes(weekday)

          if (hasClassOnWeekday) {
            acc.studentsWithClassOnWeekday.push(student)

            return acc
          }

          acc.studentsWithoutClassOnWeekday.push(student)

          return acc
        },
        { studentsWithClassOnWeekday: [], studentsWithoutClassOnWeekday: [] },
      )
    }, [selectedDate])

  return (
    <Flex w="full" flexDir="column" gap="8" px="4">
      <VStack w="full" gap="4">
        <StudentList
          title={`Alunos com aula pervista para ${fullDateFormatted}`}
          students={studentsWithClassOnWeekday}
        />

        <Divider />

        <StudentList
          title={`Aluno sem aula pervista para ${fullDateFormatted}`}
          students={studentsWithoutClassOnWeekday}
        />
      </VStack>

      <Button colorScheme="green" mt="8">
        Salvar
      </Button>
    </Flex>
  )
}
