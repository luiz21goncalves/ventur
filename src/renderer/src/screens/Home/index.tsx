import { Box } from '@chakra-ui/react'

import { StudentList } from './StudentList'

export function Home() {
  return (
    <Box overflowY="auto" px="2" py="4">
      <StudentList />
    </Box>
  )
}
