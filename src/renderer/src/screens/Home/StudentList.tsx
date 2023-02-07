import { SimpleGrid, VStack } from '@chakra-ui/react'

import { EmptyMessage } from '../../components/EmptyMessage'
import { useStudentsQuery } from '../../queries/useStudentsQuery'
import { StudentCard } from './StudentCard'

export function StudentList() {
  const { data: students } = useStudentsQuery()

  const isEmptyList = students?.length === 0

  return (
    <VStack gap="4" align="flex-start">
      {isEmptyList ? (
        <EmptyMessage>Não há alunos.</EmptyMessage>
      ) : (
        <SimpleGrid columns={2} spacing="4" w="full">
          {students?.map((student) => {
            return <StudentCard key={student.id} student={student} />
          })}
        </SimpleGrid>
      )}
    </VStack>
  )
}
