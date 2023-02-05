import {
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import { InputDate } from '../../components/Inputs/InputDate'
import { useStudentDetailsQuery } from '../../queries/useStudentDetailsQuery'
import { capitalize } from '../../utils/capitalize'
import { formatMonetary } from '../../utils/format-monetary'
import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'

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
      <Heading mb="4">Aluno: {student?.name}</Heading>

      <VStack alignItems="flex-start" mb="8">
        <Text>Aniversário: {student?.classes_per_week}</Text>
        <Text>Aulas por semana: {student?.classes_per_week}</Text>
        <Text>Dias da aula: {weekdayLabels}</Text>
        <Text>Preço mensal: {formattedPrice}</Text>
      </VStack>

      <Center>
        <InputDate />
      </Center>

      <SimpleGrid columns={2} gap="8" w="full">
        <VStack>
          <Heading size="md" mb="2">
            Dezembro
          </Heading>
          <HStack alignItems="flex-start" gap="4">
            <VStack justifySelf="flex-start" alignItems="flex-start">
              <Text fontSize="lg">Total de aulas: 20</Text>
              <Text fontSize="lg">A pagar: 200,00</Text>
            </VStack>

            <VStack h="80" overflowY="scroll" pr="2">
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
          </HStack>
        </VStack>

        <VStack>
          <Heading size="md" mb="2">
            Janeiro
          </Heading>
          <HStack alignItems="flex-start" gap="4">
            <VStack justifySelf="flex-start" alignItems="flex-start">
              <Text fontSize="lg">Total de aulas: 20</Text>
              <Text fontSize="lg">A pagar: 200,00</Text>
            </VStack>

            <VStack h="80" overflowY="scroll" pr="2">
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
          </HStack>
        </VStack>
      </SimpleGrid>
    </Flex>
  )
}
