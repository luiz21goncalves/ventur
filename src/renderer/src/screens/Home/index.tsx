import { Box, HStack, SimpleGrid, VStack } from '@chakra-ui/react'

import { Calendar } from '../../components/Calendar'
import { DeleteHolidayModal } from './DeleteHolidayModal'
import { DeleteStudentModal } from './DeleteStudentModal'
import { NewHolidayModal } from './NewHolidayModal'
import { NewStudentModal } from './NewStudentModal'
import { StudentList } from './StudentList'

export function Home() {
  return (
    <SimpleGrid columns={2} gap="6" h="container.md">
      <Box overflowY="auto" p="2" pr="4">
        <StudentList />
      </Box>

      <Box>
        <Calendar />

        <VStack w="full" mt="8" gap="2">
          <HStack w="full">
            <NewStudentModal />
            <NewHolidayModal />
          </HStack>

          <HStack w="full">
            <DeleteStudentModal />
            <DeleteHolidayModal />
          </HStack>
        </VStack>
      </Box>
    </SimpleGrid>
  )
}
