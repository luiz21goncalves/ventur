import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react'

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
    <Card w="full" p="4" gap="4">
      <CardHeader p="0">
        <Heading size="sm" textAlign="center">
          {student.name}
        </Heading>
      </CardHeader>

      <CardBody p="0">
        <Text>Total Total 0</Text>
        <Text>Aulas por semana {student.classes_per_week}</Text>
        <Text>Dias de aula: {weekdayLabels}</Text>
      </CardBody>

      <CardFooter p="0" justify="space-between">
        <Button variant="ghost">Detalhes</Button>
      </CardFooter>
    </Card>
  )
}
