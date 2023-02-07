import { Box, Grid, GridItem, HStack } from '@chakra-ui/react'

import { Calendar } from '../../components/Calendar'
import { DeleteHolidayModal } from './DeleteHolidayModal'
import { DeleteStudentModal } from './DeleteStudentModal'
import { NewHolidayModal } from './NewHolidayModal'
import { NewStudentModal } from './NewStudentModal'
import { StudentList } from './StudentList'

export function Home() {
  return (
    <Grid gridTemplateColumns="repeat(2,1fr)" gap="4" h="container.md">
      <GridItem overflowY="auto" px="2" py="4">
        <Box overflowY="auto" px="2" py="4">
          <StudentList />
        </Box>
      </GridItem>

      <GridItem>
        <HStack w="full" mb="4" gap="4">
          <NewStudentModal />
          <NewHolidayModal />
          <DeleteStudentModal />
          <DeleteHolidayModal />
        </HStack>
        <Calendar />
      </GridItem>
    </Grid>
  )
}
