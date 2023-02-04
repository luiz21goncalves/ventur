import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/routes'
import { Student } from '@/shared/types'

import { getWeekdays } from '../../utils/get-weekdays'

const weekdaysLabels = getWeekdays()

type StudentCardProps = {
  student: Student
}

export function StudentCard(props: StudentCardProps) {
  const { student } = props

  const navigate = useNavigate()

  function handleNavigateToStudentDetails() {
    navigate(`${ROUTES.STUDENTS.BASE}/${student.id}`)
  }

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
        <Text>
          Dias de aula:{' '}
          {student.weekdays
            .map((weekday) => weekdaysLabels.short[weekday].toUpperCase())
            .join(', ')}
        </Text>
      </CardBody>

      <CardFooter p="0" justify="space-between">
        <Button variant="ghost" onClick={handleNavigateToStudentDetails}>
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
