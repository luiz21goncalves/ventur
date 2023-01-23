import {
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import { studentFactory } from '../../factories/student.factory'

const student = studentFactory.build()

export function StudentDetails() {
  return (
    <Flex flexDir="column" gap="4">
      <Heading mb="4">Aluno: {student.name}</Heading>

      <VStack alignItems="flex-start" mb="8">
        <Text>Aniversário: {student.classes_per_week}</Text>
        <Text>Email: {student?.email}</Text>
        <Text>Senha: {student?.password}</Text>
        <Text>Aulas por semana: {student.classes_per_week}</Text>
        <Text>Dias da semana: {JSON.stringify(student.weekdays, null, 2)}</Text>
        <Text>Preço mensal: {student.price_per_month}</Text>
      </VStack>

      <Center>
        <InputGroup maxW="80">
          <InputLeftAddon>Data de referencia</InputLeftAddon>
          <Input type="date" maxW="40" defaultValue="2023-01-23" />
        </InputGroup>
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
