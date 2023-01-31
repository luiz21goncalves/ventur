import { Grid, GridItem, useToken } from '@chakra-ui/react'

import { Calendar } from '../../components/Calendar'
import { StudentList } from './StudentList'

export function Home() {
  const [firstColumWidth, secondColumWith] = useToken('sizes', [
    'xs',
    'container.sm',
  ])

  return (
    <Grid
      gridTemplateColumns={`${firstColumWidth} ${secondColumWith}`}
      gap="4"
      h="container.md"
    >
      <GridItem overflowY="auto" px="2" py="4">
        <StudentList />
      </GridItem>

      <GridItem>
        <Calendar />
      </GridItem>
    </Grid>
  )
}
