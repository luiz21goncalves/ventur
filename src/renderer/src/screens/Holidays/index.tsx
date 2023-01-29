import { Button, Grid, Text, useToken, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { Calendar } from '../../components/Calendar'
import { InputText } from '../../components/Inputs/InputText'
import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

export function Holidays() {
  const [firstColumWidth, secondColumWith] = useToken('sizes', [
    'xs',
    'container.sm',
  ])
  const [selectedDate] = useCalendarSelectedDate()

  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')

  return (
    <Grid gridTemplateColumns={`${firstColumWidth} ${secondColumWith}`} gap="4">
      <VStack as="form" gap="4" alignItems="flex-start">
        <Text>Definir feriado para {formattedDate}</Text>
        <InputText label="Título" />

        <Button colorScheme="green" w="full" type="submit">
          Salvar
        </Button>
      </VStack>

      <Calendar />
    </Grid>
  )
}
