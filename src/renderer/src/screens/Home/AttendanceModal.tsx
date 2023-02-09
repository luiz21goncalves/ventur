import { Checkbox, Text, useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Info } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Student } from '@/shared/types'

import * as Modal from '../../components/Modal'
import { useModal } from '../../components/Modal/ModalContext'
import { useAttendanceMutation } from '../../queries/useAttendanceMutation'
import { useAttendanceQuery } from '../../queries/useAttendanceQuery'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

type AttendanceModalProps = {
  student: Student
}

const attendanceFormSchema = z.object({
  presence: z.boolean(),
  studentId: z.string().uuid(),
})

type AttendanceFormData = z.infer<typeof attendanceFormSchema>

export function AttendanceModal(props: AttendanceModalProps) {
  const { student } = props

  const toast = useToast()
  const { onClose } = useModal()

  const [selectedDate] = useCalendarSelectedDate()

  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')
  const weekday = dayjs(selectedDate).get('day')

  const hasClassToday = student.weekdays.includes(weekday)

  const { data: attendance } = useAttendanceQuery({ studentId: student.id })
  const { mutate, isLoading } = useAttendanceMutation()

  const { register, reset, handleSubmit } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceFormSchema),
    values: {
      presence: attendance?.presence ?? false,
      studentId: student.id,
    },
  })

  function handleCloseModal() {
    reset()
    onClose()
  }

  function handleSaveOrCreateAttendance(data: AttendanceFormData) {
    const { presence, studentId } = data

    mutate(
      {
        date: dayjs(selectedDate).startOf('date').toISOString(),
        presence,
        studentId,
      },
      {
        onSuccess() {
          toast({
            description: `${student.name} na data ${formattedDate}`,
            position: 'top-right',
            status: 'success',
            title: `Presença atualizada`,
          })

          handleCloseModal()
        },
      },
    )
  }

  return (
    <Modal.Root>
      <Modal.Trigger variant="ghost" colorScheme="gray">
        Presença
      </Modal.Trigger>

      <Modal.Content
        as="form"
        onSubmit={handleSubmit(handleSaveOrCreateAttendance)}
      >
        <Modal.Header>
          {student.name} teve aula {formattedDate}?
        </Modal.Header>

        <Modal.Body>
          <VStack w="full" alignItems="flex-start" gap="4">
            {!hasClassToday && (
              <Text
                color="gray.500"
                display="flex"
                alignItems="center"
                gap="0.5"
              >
                <Info />
                Esse alunos não tem aula prevista para hoje
              </Text>
            )}

            <Text
              as="label"
              fontStyle="lg"
              display="flex"
              alignItems="center"
              gap="2"
            >
              Presente <Checkbox size="lg" {...register('presence')} />
            </Text>
          </VStack>
        </Modal.Body>

        <Modal.Footer isDisableSubmit={isLoading} />
      </Modal.Content>
    </Modal.Root>
  )
}
