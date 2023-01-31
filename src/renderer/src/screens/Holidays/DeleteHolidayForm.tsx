import { Button, HStack, Text, useToast } from '@chakra-ui/react'

import { Holiday } from '@/shared/types'

import { useDeleteHolidayMutation } from '../../queries/useDeleteHolidayMutation'

type DeleteHolidayFormProps = {
  holiday: Holiday
}

export function DeleteHolidayForm(props: DeleteHolidayFormProps) {
  const { holiday } = props

  const toast = useToast()

  const { mutate, isLoading } = useDeleteHolidayMutation()

  function handleDeleteHoloday() {
    mutate(
      {
        date: holiday.date,
        holidayId: holiday.id!,
      },
      {
        onSuccess() {
          toast({
            position: 'top-right',
            status: 'info',
            title: `Feriado ${holiday.name} apagado`,
          })
        },
      },
    )
  }

  return (
    <HStack
      w="full"
      justify="space-between"
      borderBottom="1px"
      borderColor="gray"
      p="2"
    >
      <Text>{holiday.name}</Text>

      <Button
        variant="ghost"
        colorScheme="red"
        onClick={handleDeleteHoloday}
        disabled={isLoading}
      >
        Apagar
      </Button>
    </HStack>
  )
}
