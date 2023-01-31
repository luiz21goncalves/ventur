import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header'

export function DefaultLayout() {
  const backgroundColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box w="100vw" h="100vh" bgColor={backgroundColor} px="8">
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100vw"
        maxWidth="container.xl"
        h="100vh"
        mx="auto"
      >
        <Header />

        <Box w="full" height="container.md">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}
