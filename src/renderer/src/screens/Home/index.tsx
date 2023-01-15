import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react'

import { Calendar } from '../../components/Calendar'
import { ToggleTheme } from '../../components/ToggleTheme'
import { studentFactory } from '../../factories/student.factory'

const students = studentFactory.buildList(4)

export function Home() {
  const [firstColumWidth, secondColumWith] = useToken('sizes', [
    'xs',
    'container.sm',
  ])

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100vw"
      maxWidth="container.lg"
      h="100vh"
      mx="auto"
      p="8"
    >
      <Box height="container.md">
        <HStack w="full" justify="space-between" mb="8">
          <Box />
          <ToggleTheme />
        </HStack>

        <Grid
          gridTemplateColumns={`${firstColumWidth} 1px ${secondColumWith}`}
          gap="8"
        >
          <GridItem>
            <VStack gap="4" align="flex-start">
              {students.map((student) => {
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
                      <Button variant="ghost">Detalhes</Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </VStack>
          </GridItem>

          <Divider orientation="vertical" />
          <GridItem>
            <Calendar />
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  )
}
