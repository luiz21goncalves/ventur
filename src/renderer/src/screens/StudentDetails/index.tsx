import { Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react'

import { useStudentDetailsQuery } from '../../queries/useStudentDetailsQuery'
import { capitalize } from '../../utils/capitalize'
import { formatMonetary } from '../../utils/format-monetary'
import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'
import { AttendanceForm } from './AttendanceForm'
import { ClassList } from './ClassList'

export function StudentDetails() {
  const { data: student } = useStudentDetailsQuery()

  const weekdayLabels = getWeekdaysLabelsShort(student?.weekdays ?? [])
    .map((weekday) => {
      const capitalizedWeekday = capitalize(weekday)

      return capitalizedWeekday
    })
    .join(', ')

  const formattedPrice = formatMonetary(
    (student?.price_per_month_in_cents ?? 0) / 100,
  )

  return (
    <Flex flexDir="column" gap="4">
      <Heading mb="4">{student?.name}</Heading>

      <VStack alignItems="flex-start">
        <Text>Aulas por semana: {student?.classes_per_week}</Text>
        <Text>Dias da aula: {weekdayLabels}</Text>
        <Text>Preço mensal: {formattedPrice}</Text>
        {student?.birthdate && <Text>Aniversário: {student?.birthdate}</Text>}
        <Text fontWeight="bold">Total de aulas: 20</Text>
        <Text fontWeight="bold">A pagar: 200,00</Text>
      </VStack>

      <Divider />

      <AttendanceForm />

      <Divider />

      <ClassList />
    </Flex>
  )
}
