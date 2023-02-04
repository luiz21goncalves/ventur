import { VStack } from '@chakra-ui/react'

import { EmptyMessageToStudent } from '../../components/EmptyMessages/EmptyMessageToStudent'
import { useStudentsQuery } from '../../queries/useStudentsQuery'
import { StudentCard } from './StudentCard'

export function StudentList() {
  const { data: students } = useStudentsQuery()

  const isEmptyStudentsList = students?.length === 0

  return (
    <VStack gap="4" align="flex-start">
      {isEmptyStudentsList ? (
        <EmptyMessageToStudent hasLink />
      ) : (
        students?.map((student) => {
          return <StudentCard key={student.id} student={student} />
        })
      )}
    </VStack>
  )
}
