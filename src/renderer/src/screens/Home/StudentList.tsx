import { VStack } from '@chakra-ui/react'

import { EmptyMessageToStudent } from '../../components/EmptyMessages/EmptyMessageToStudent'
import { studentFactory } from '../../factories/student.factory'
import { StudentCard } from './StudentCard'

const students = studentFactory.buildList(6)

export function StudentList() {
  const isEmptyStudentsList = students.length === 0

  return (
    <VStack gap="4" align="flex-start">
      {isEmptyStudentsList ? (
        <EmptyMessageToStudent hasLink />
      ) : (
        students.map((student) => {
          return <StudentCard key={student.id} student={student} />
        })
      )}
    </VStack>
  )
}
