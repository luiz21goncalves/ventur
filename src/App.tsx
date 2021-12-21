
import { Greetings } from './components/Greetings'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme'

export function App () {
  return (
    <ChakraProvider theme={theme}>
      <Greetings />
    </ChakraProvider>
  )
}
