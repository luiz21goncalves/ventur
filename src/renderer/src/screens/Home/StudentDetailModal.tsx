import { Text, useDisclosure, VStack } from '@chakra-ui/react'

import * as Modal from '../../components/Modal'
import { useStudentDetailsQuery } from '../../queries/useStudentDetailsQuery'
import { capitalize } from '../../utils/capitalize'
import { formatMonetary } from '../../utils/format-monetary'
import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'

type StudentDetailModalProps = {
  studentId: number
}

export function StudentDetailModal(props: StudentDetailModalProps) {
  const { studentId } = props

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data: student } = useStudentDetailsQuery({ studentId })

  if (!student) {
    return null
  }

  const weekdayLabels = getWeekdaysLabelsShort(student.weekdays)
    .map(capitalize)
    .join(', ')
  const price = formatMonetary(student.price_per_month_in_cents / 100)

  return (
    <>
      <Modal.Trigger variant="ghost" onClick={onOpen}>
        Detalhes
      </Modal.Trigger>

      <Modal.Root isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.Header>Detalhes do Aluno</Modal.Header>

          <Modal.Body mb="4">
            <VStack alignItems="flex-start" gap="1" mb="4">
              <Text>Nome: {student?.name}</Text>
              <Text>Aniversário: {student?.birthdate}</Text>
              <Text>Aulas por semana: {student?.classes_per_week}</Text>
              <Text>Dias de aula: {weekdayLabels}</Text>
              <Text>Valor: {price}</Text>
              <Text>A pagar: R$ 199,99</Text>
              <Text>Total de aulas: 45</Text>
            </VStack>

            <VStack alignItems="flex-start" gap="1" overflowY="scroll" h="80">
              {Array.from({ length: 20 }).map((_, index) => {
                const date = new Date().toUTCString()
                const line = index + 1

                return (
                  <Text key={line}>
                    Aula {line}: {date}
                  </Text>
                )
              })}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
