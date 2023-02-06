import { Box, Grid, GridItem } from '@chakra-ui/react'

import { Calendar } from '../../components/Calendar'
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
        <Calendar />
      </GridItem>
    </Grid>
  )
}
