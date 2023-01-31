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

import { Student } from '@/shared/types'

type StudentCardProps = {
  student: Student
}

export function StudentCard(props: StudentCardProps) {
  const { student } = props

  const navigate = useNavigate()

  function handleNavigateToStudentDetails() {
    navigate(`/student/${student.id}`)
  }

  return (
    <Card w="full" p="4" gap="4">
      <CardHeader p="0">
        <Heading size="sm" textAlign="center">
          {student.name}
        </Heading>
      </CardHeader>

      <CardBody p="0">
        <Text>Total Total {student.classes_per_month}</Text>
        <Text>Aulas por semana {student.classes_per_week}</Text>
      </CardBody>

      <CardFooter p="0" justify="space-between">
        <Button variant="ghost" onClick={handleNavigateToStudentDetails}>
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
