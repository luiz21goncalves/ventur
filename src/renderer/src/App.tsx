import './lib/dayjs'

import { ChakraProvider } from '@chakra-ui/react'

import { Routes } from './Routes'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Routes />
    </ChakraProvider>
  )
}
