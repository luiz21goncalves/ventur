import { Divider, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { EmptyMessage } from '../../components/EmptyMessage'
import * as Modal from '../../components/Modal'
import { useStudentAttendancesQuery } from '../../queries/useStudentAttendancesQuery'
import { useStudentDetailsQuery } from '../../queries/useStudentDetailsQuery'
import { capitalize } from '../../utils/capitalize'
import { formatMonetary } from '../../utils/format-monetary'
import { getWeekdaysLabelsShort } from '../../utils/get-weekdays-labels-short'

type StudentDetailModalProps = {
  studentId: string
}

export function StudentDetailModal(props: StudentDetailModalProps) {
  const { studentId } = props

  const { data: student } = useStudentDetailsQuery({ studentId })
  const { data: attendances } = useStudentAttendancesQuery({ studentId })

  if (!student) {
    return null
  }

  const weekdayLabels = getWeekdaysLabelsShort(student.weekdays)
    .map(capitalize)
    .join(', ')
  const price = formatMonetary(student.price_per_month_in_cents / 100)

  const hasAttendances = attendances && attendances.length > 0

  return (
    <Modal.Root>
      <Modal.Trigger variant="ghost">Detalhes</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>Detalhes do Aluno</Modal.Header>

        <Modal.Body mb="4">
          <VStack alignItems="flex-start" gap="1">
            <Text>Nome: {student?.name}</Text>
            <Text>Aniversário: {student?.birthdate}</Text>
            <Text>Aulas por semana: {student?.classes_per_week}</Text>
            <Text>Dias de aula: {weekdayLabels}</Text>
            <Text>Valor: {price}</Text>
            <Text>A pagar: R$ 199,99</Text>
            <Text>Total de aulas: {attendances?.length}</Text>
          </VStack>

          <Divider my="4" />

          {hasAttendances ? (
            <VStack alignItems="flex-start" gap="1" overflowY="auto" maxH="80">
              {attendances?.map((attendance, index) => {
                const date = dayjs(attendance.date).format('DD/MM/YYYY')
                const line = index + 1

                return (
                  <Text key={attendance.id}>
                    {line}ª aula: {date}
                  </Text>
                )
              })}
            </VStack>
          ) : (
            <EmptyMessage>
              Não há nenhuma aula desse alunos nesse mês
            </EmptyMessage>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
