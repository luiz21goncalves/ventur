import { VStack } from '@chakra-ui/react'

import { studentFactory } from '../../factories/student.factory'
import { StudentCard } from './StudentCard'

const students = studentFactory.buildList(6)

export function StudentList() {
  return (
    <VStack gap="4" align="flex-start">
      {students.map((student) => {
        return <StudentCard key={student.id} student={student} />
      })}
    </VStack>
  )
}
