import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { Student } from '@/shared/types'

import { capitalize } from '../../utils/capitalize'
import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'
import { EditStudentModal } from './EditStudentModal'
import { StudentDetailModal } from './StudentDetailModal'

type StudentCardProps = {
  student: Student
}

export function StudentCard(props: StudentCardProps) {
  const { student } = props

  const weekdayLabels = getWeekdaysLabelsShort(student.weekdays)
    .map(capitalize)
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
        <Text>Aulas por semana: {student.classes_per_week}</Text>
        <Text>Dias de aula: {weekdayLabels}</Text>
      </Box>

      <HStack w="full" justifyContent="space-between">
        <StudentDetailModal studentId={student.id} />
        <EditStudentModal student={student} />
      </HStack>
    </VStack>
  )
}
