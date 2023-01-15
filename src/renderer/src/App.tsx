import './lib/dayjs'

import { ChakraProvider } from '@chakra-ui/react'

export function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Heading>Ventur</Heading>
      <ToggleTheme />
    </ChakraProvider>
  )
}
