import { VStack } from '@chakra-ui/react'

import { CreateHolidayForm } from './CreateHolidayForm'
import { HolidaysList } from './HolidaysList'

export function Holidays() {
  return (
    <VStack w="full" gap="12">
      <CreateHolidayForm />
      <HolidaysList />
    </VStack>
  )
}
