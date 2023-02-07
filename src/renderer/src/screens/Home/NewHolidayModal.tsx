import { Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputText } from '../../components/Inputs/InputText'
import * as Modal from '../../components/Modal'
import { useCreteHolidayMutation } from '../../queries/useCreteHolidayMutation'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

const createNewHolidayFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Esse campo deve conter pelo menos dois caracteres.' }),
})

type CreateNewHolidayFormData = z.infer<typeof createNewHolidayFormSchema>

export function NewHolidayModal() {
  const toast = useToast()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [selectedDate] = useCalendarSelectedDate()
  const { mutate, isLoading } = useCreteHolidayMutation()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateNewHolidayFormData>({
    resolver: zodResolver(createNewHolidayFormSchema),
  })

  function handleCloseModal() {
    onClose()
    reset()
  }

  async function handleCreateNewHoliday(data: CreateNewHolidayFormData) {
    const { title } = data

    mutate(
      {
        date: dayjs(selectedDate).startOf('day').toISOString(),
        name: title,
      },
      {
        onSuccess() {
          handleCloseModal()

          toast({
            position: 'top-right',
            status: 'success',
            title: `Feriado ${title} criado`,
          })
        },
      },
    )
  }

  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')

  const isSubmittingForm = isSubmitting || isLoading

  return (
    <>
      <Modal.Trigger onClick={onOpen}>Novo feriado</Modal.Trigger>

      <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
        <Modal.Content
          as="form"
          onSubmit={handleSubmit(handleCreateNewHoliday)}
        >
          <Modal.Header>Criar novo feriado</Modal.Header>

          <Modal.Body>
            <VStack alignItems="flex-start" w="full" gap="4">
              <Text>
                Definir feriado para{' '}
                <Text as="span" fontWeight="bold">
                  {formattedDate}
                </Text>
              </Text>

              <InputText
                label="Título"
                errorMessage={errors.title?.message}
                {...register('title')}
              />
            </VStack>
          </Modal.Body>

          <Modal.Footer
            onCancel={handleCloseModal}
            isDisableSubmit={isSubmittingForm}
          />
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
