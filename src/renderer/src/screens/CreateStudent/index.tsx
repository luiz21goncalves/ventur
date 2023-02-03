import { Button, Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputText } from '../../components/Inputs/InputText'
import { InputWeekday } from '../../components/Inputs/InputWeekday'
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
type CreateStudentFormOut = z.input<typeof createStudentFormSchema>

export function CreateStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentFormInput, CreateStudentFormOut>({
    resolver: zodResolver(createStudentFormSchema),
  })

  function handleCreateStudent(data: CreateStudentFormOut) {
    console.log(data)
  }

  function handleResetCreateStudentForm() {
    reset()
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(handleCreateStudent)}
      flexDir="column"
      gap="6"
    >
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

      <Flex justifyContent="space-between">
        <Button
          variant="ghost"
          colorScheme="red"
          px="8"
          textTransform="uppercase"
          type="reset"
          onClick={handleResetCreateStudentForm}
        >
          Limpar
        </Button>

        <Button
          type="submit"
          colorScheme="green"
          px="8"
          textTransform="uppercase"
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
