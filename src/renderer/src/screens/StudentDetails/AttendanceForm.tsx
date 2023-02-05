import { Button, Center, HStack, Switch, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useCalendarSelectedDate } from '../../stores/useCalendarSelectedDate'

export function AttendanceForm() {
  const [selectedDate] = useCalendarSelectedDate()

  const formatedDate = dayjs(selectedDate).format(
    'dddd, DD [ de ] MMMM [ de ] YYYY',
  )

  return (
    <Center flexDir="column">
      <HStack w="full" justifyContent="space-evenly">
        <Text>Atualizar presença para {formatedDate}</Text>

        <Switch size="lg" />

        <Button colorScheme="green">Salvar</Button>
      </HStack>
    </Center>
  )
}
