import './lib/dayjs'

import { Box, ChakraProvider, SystemStyleObject } from '@chakra-ui/react'

import { Routes } from './Routes'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Box w="100vw" h="100vh" bgColor="gray.50" _dark={darkStyles}>
        <Routes />
      </Box>
    </ChakraProvider>
  )
}

const darkStyles: SystemStyleObject = { bgColor: 'gray.900' }
