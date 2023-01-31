import { Button, HStack, Text, useToast, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputText } from '../../components/Inputs/InputText'
import { useCreteHolidayMutation } from '../../queries/useCreteHolidayMutation'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

const createNewHolidayFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Esse campo deve conter pelo menos dois caracteres.' }),
})

type CreateNewHolidayFormData = z.infer<typeof createNewHolidayFormSchema>

export function CreateHolidayForm() {
  const toast = useToast()
  const [selectedDate] = useCalendarSelectedDate()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateNewHolidayFormData>({
    resolver: zodResolver(createNewHolidayFormSchema),
  })

  const { mutate, isLoading } = useCreteHolidayMutation()

  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')

  async function handleCreateNewHoliday(data: CreateNewHolidayFormData) {
    const { title } = data

    mutate(
      {
        date: dayjs(selectedDate).startOf('day').toISOString(),
        name: title,
      },
      {
        onSuccess() {
          reset()

          toast({
            position: 'top-right',
            status: 'success',
            title: `Feriado ${title} criado`,
          })
        },
      },
    )
  }

  const isSubmittingForm = isSubmitting || isLoading

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(handleCreateNewHoliday)}
      alignItems="flex-start"
      w="full"
      gap="4"
    >
      <Text>
        Definir feriado para{' '}
        <Text as="span" fontWeight="bold">
          {formattedDate}
        </Text>
      </Text>

      <VStack w="full" align="flex-start">
        <HStack w="full" align="flex-end" gap="4" justify="space-between">
          <InputText
            label="Título"
            errorMessage={errors.title?.message}
            {...register('title')}
          />

          <Button colorScheme="green" type="submit" disabled={isSubmittingForm}>
            Salvar
          </Button>
        </HStack>
        <Text color="red" fontSize="sm" mt="2">
          {errors.title?.message}
        </Text>
      </VStack>
    </VStack>
  )
}
