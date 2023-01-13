import { ChakraProvider, Heading } from '@chakra-ui/react'

import { ToggleTheme } from './components/ToggleTheme'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Heading>Ventur</Heading>
      <ToggleTheme />
    </ChakraProvider>
  )
}
