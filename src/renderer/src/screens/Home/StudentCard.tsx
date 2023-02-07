import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'

import { Student } from '@/shared/types'

import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'

type StudentCardProps = {
  student: Student
}

export function StudentCard(props: StudentCardProps) {
  const { student } = props

  const weekdayLabels = getWeekdaysLabelsShort(student.weekdays)
    .map((weekdays) => {
      const capitalizedWeekday = weekdays
        .substring(0, 1)
        .toUpperCase()
        .concat(weekdays.substring(1))

      return capitalizedWeekday
    })
    .join(', ')

  return (
    <VStack
      w="full"
      py="4"
      px="6"
      gap="2"
      bg="white"
      borderRadius="lg"
      shadow="md"
      justifyContent="flex-start"
    >
      <Text size="lg" fontWeight="bold">
        {student.name}
      </Text>

      <Box>
        <Text>Total de aulas: 0</Text>
        <Text>Valor apagar: R$ 100,00</Text>
        <Text>Aulas por semana: {student.classes_per_week}</Text>
        <Text>Dias de aula: {weekdayLabels}</Text>
      </Box>

      <HStack w="full" justifyContent="space-between">
        <Button variant="ghost">Detalhes</Button>
        <Button variant="ghost">Editar</Button>
      </HStack>
    </VStack>
  )
}
