import { VStack } from '@chakra-ui/react'

import { EmptyMessage } from '../../components/EmptyMessage'
import { useStudentsQuery } from '../../queries/useStudentsQuery'
import { StudentCard } from './StudentCard'

export function StudentList() {
  const { data: students } = useStudentsQuery()

  const isEmptyStudentsList = students?.length === 0

  return (
    <VStack gap="4" align="flex-start">
      {isEmptyStudentsList ? (
        <EmptyMessage>Não há alunos.</EmptyMessage>
      ) : (
        students?.map((student) => {
          return <StudentCard key={student.id} student={student} />
        })
      )}
    </VStack>
  )
}
