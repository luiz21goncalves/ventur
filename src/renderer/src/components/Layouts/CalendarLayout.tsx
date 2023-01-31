import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Calendar } from '../Calendar'

export function CalendarLayout() {
  return (
    <Grid gridTemplateColumns="repeat(2,1fr)" gap="4" h="container.md">
      <GridItem overflowY="auto" px="2" py="4">
        <Outlet />
      </GridItem>

      <GridItem>
        <Calendar />
      </GridItem>
    </Grid>
  )
}
