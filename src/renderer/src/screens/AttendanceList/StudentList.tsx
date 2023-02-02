import { Divider, HStack, Switch, Text, VStack } from '@chakra-ui/react'

import { Student } from '@/shared/types'

import { EmptyMessageToStudent } from '../../components/EmptyMessages/EmptyMessageToStudent'

type StudentListProps = {
  title: string
  students: Student[]
}

export function StudentList(props: StudentListProps) {
  const { students, title } = props

  const isEmptyStydentsList = students.length === 0

  return (
    <VStack gap="2">
      <Text mb="2">{title}</Text>
      {isEmptyStydentsList ? (
        <EmptyMessageToStudent />
      ) : (
        students.map((student, index, originalArray) => {
          const isChecked = Math.round(Math.random() * 2) % 2 === 0
          const isNotLastRow = !(originalArray.length - 1 === index)

          return (
            <VStack key={student.id} gap="0.5" w="full">
              <HStack w="full" justifyContent="space-between">
                <Text>{student.name}</Text>

                <HStack gap="4">
                  <Text>Teve aula?</Text>

                  <Switch size="lg" defaultChecked={isChecked} />
                </HStack>
              </HStack>

              {isNotLastRow && <Divider />}
            </VStack>
          )
        })
      )}
    </VStack>
  )
}
