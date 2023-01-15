import './lib/dayjs'

import { Box, ChakraProvider, SystemStyleObject } from '@chakra-ui/react'

import { Home } from './screens/Home'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Box w="100vw" h="100vh" bgColor="gray.50" _dark={darkStyles}>
        <Home />
      </Box>
    </ChakraProvider>
  )
}

const darkStyles: SystemStyleObject = { bgColor: 'gray.900' }
