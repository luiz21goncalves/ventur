import { Button, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { InputText } from '../../components/Inputs/InputText'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

export function Holidays() {
  const [selectedDate] = useCalendarSelectedDate()

  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')

  return (
    <VStack as="form" gap="4" alignItems="flex-start">
      <Text>Definir feriado para {formattedDate}</Text>
      <InputText label="Título" />

      <Button colorScheme="green" w="full" type="submit">
        Salvar
      </Button>
    </VStack>
  )
}
