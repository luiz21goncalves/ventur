import { useDisclosure, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputText } from '../../components/Inputs/InputText'
import { InputWeekday } from '../../components/Inputs/InputWeekday'
import * as Modal from '../../components/Modal'
import { useCrateStudentMutation } from '../../queries/useCrateStudentMutation'
import { getWeekdays } from '../../utils/get-weekdays'

const weekdaysLabel = getWeekdays()

const createStudentFormSchema = z.object({
  birthdate: z.string().nullable(),
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

type CreateStudentFormInput = z.input<typeof createStudentFormSchema>
type CreateStudentFormOut = z.output<typeof createStudentFormSchema>

export function NewStudentModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { mutate, isLoading } = useCrateStudentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentFormInput>({
    resolver: zodResolver(createStudentFormSchema),
  })

  function handleCloseModal() {
    onClose()
    reset()
  }

  function handleCreateStudent(data: any) {
    // TODO: remove this workaround after closing this issue https://github.com/react-hook-form/react-hook-form/issues/9600
    const {
      birthdate,
      name,
      price_per_month: pricePerMonth,
      weekdays_with_class: weekdaysWithClass,
    } = data as CreateStudentFormOut

    const pricePerMonthInCents = pricePerMonth * 100
    const weekdays = weekdaysWithClass.map((weekday) => weekday.weekday)

    mutate(
      {
        birthdate: birthdate ?? undefined,
        name,
        price_per_month_in_cents: pricePerMonthInCents,
        weekdays,
      },
      {
        onSuccess() {
          handleCloseModal()
        },
      },
    )
  }

  return (
    <>
      <Modal.Trigger onClick={onOpen}>Novo aluno</Modal.Trigger>

      <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Content as="form" onSubmit={handleSubmit(handleCreateStudent)}>
          <Modal.Header>Criar novo aluno</Modal.Header>

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

          <Modal.Footer
            onCancel={handleCloseModal}
            isDisableSubmit={isLoading}
          />
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
