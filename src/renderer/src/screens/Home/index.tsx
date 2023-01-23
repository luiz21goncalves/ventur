import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Calendar } from '../../components/Calendar'
import { studentFactory } from '../../factories/student.factory'

const students = studentFactory.buildList(6)

export function Home() {
  const navigate = useNavigate()

  const [firstColumWidth, secondColumWith] = useToken('sizes', [
    'xs',
    'container.sm',
  ])

  function handleNavigateToStudentDetails(studentId: string) {
    navigate(`/student/${studentId}`)
  }

  return (
    <Grid
      gridTemplateColumns={`${firstColumWidth} ${secondColumWith}`}
      gap="4"
      h="container.md"
    >
      <GridItem overflowY="auto" pr="4" py="4">
        <VStack gap="4" align="flex-start">
          {students.map((student) => {
            function handleRedirect() {
              handleNavigateToStudentDetails(student.id)
            }

            return (
              <Card w="full" p="4" gap="4" key={student.id}>
                <CardHeader p="0">
                  <Heading size="sm" textAlign="center">
                    {student.name}
                  </Heading>
                </CardHeader>

                <CardBody p="0">
                  <Text>Total de aulas {student.classes_per_month}</Text>
                  <Text>Aulas por semana {student.classes_per_week}</Text>
                </CardBody>

                <CardFooter p="0" justify="space-between">
                  <Button variant="ghost" onClick={handleRedirect}>
                    Detalhes
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </VStack>
      </GridItem>

      <GridItem>
        <Calendar />
      </GridItem>
    </Grid>
  )
}
