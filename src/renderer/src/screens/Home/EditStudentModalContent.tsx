import { useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Student } from '@/shared/types'

import { InputText } from '../../components/Inputs/InputText'
import { InputWeekday } from '../../components/Inputs/InputWeekday'
import * as Modal from '../../components/Modal'
import { useModal } from '../../components/Modal/ModalContext'
import { useEditStudentMutation } from '../../queries/useEditStudentMutation'
import { getWeekdays } from '../../utils/get-weekdays'

type EditStudentModalContentProps = {
  student: Student
}

const weekdaysLabel = getWeekdays()

const editStudentFormSchema = z.object({
  birthdate: z.string().nullable(),
  id: z.string().uuid(),
  name: z
    .string()
    .min(2, { message: 'Você precisa adicionar um nome para o aluno.' }),
  price_per_month: z.coerce
    .number()
    .min(1, { message: 'Você precisa adicionar o preço.' }),
  weekdays_with_class: z
    .array(z.boolean())
    .length(7)
    .transform((weekdaysWithClass) => {
      return weekdaysWithClass.map((weekday, index) => {
        return {
          enable: weekday,
          weekday: index,
          weekdayLabel: weekdaysLabel.short[index],
        }
      })
    })
    .transform((weekdays) =>
      weekdays.filter((weekday) => {
        return weekday.enable
      }),
    )
    .refine((weekdays) => weekdays.length > 0, {
      message: 'Você precisar selecionar pelo menos um dia da semana.',
    }),
})

type EditStudentFormInput = z.input<typeof editStudentFormSchema>
type EditStudentFormOut = z.output<typeof editStudentFormSchema>

export function EditStudentModalContent(props: EditStudentModalContentProps) {
  const { student } = props

  const { onClose } = useModal()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditStudentFormInput>({
    resolver: zodResolver(editStudentFormSchema),
    values: {
      birthdate: student.birthdate ?? null,
      id: student.id,
      name: student.name,
      price_per_month: student.price_per_month_in_cents / 100,
      weekdays_with_class: Array.from({ length: 7 }).map((_, index) => {
        if (student.weekdays.includes(index)) {
          return true
        }

        return false
      }),
    },
  })

  const { mutate, isLoading } = useEditStudentMutation()

  function handleCloseModal() {
    onClose()
    reset()
  }

  function handleEditStudent(data: any) {
    // TODO: remove this workaround after closing this issue https://github.com/react-hook-form/react-hook-form/issues/9600
    const {
      birthdate,
      name,
      price_per_month: pricePerMonth,
      weekdays_with_class: weekdaysWithClass,
      id,
    } = data as EditStudentFormOut

    const pricePerMonthInCents = pricePerMonth * 100
    const weekdays = weekdaysWithClass.map((weekday) => weekday.weekday)

    mutate(
      {
        birthdate: birthdate ?? undefined,
        id,
        name,
        price_per_month_in_cents: pricePerMonthInCents,
        weekdays,
      },
      {
        onSuccess(data) {
          handleCloseModal()
          toast({
            position: 'top-right',
            status: 'success',
            title: `Aluno ${data.name} atualizado`,
          })
        },
      },
    )
  }

  return (
    <Modal.Content as="form" onSubmit={handleSubmit(handleEditStudent)}>
      <Modal.Header>Atuliza dados do aluno</Modal.Header>

      <Modal.Body>
        <VStack gap="4">
          <InputText
            label="Nome"
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <InputText
            label="Aniversário"
            isRequired={false}
            errorMessage={errors.birthdate?.message}
            {...register('birthdate')}
          />

          <InputWeekday
            onRegisterField={register}
            errorMessage={errors.weekdays_with_class?.message}
          />

          <InputText
            label="Preço por mês"
            type="number"
            errorMessage={errors.price_per_month?.message}
            {...register('price_per_month')}
          />
        </VStack>
      </Modal.Body>

      <Modal.Footer isDisableSubmit={isLoading} />
    </Modal.Content>
  )
}
