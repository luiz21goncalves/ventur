import './lib/dayjs'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from './lib/query-client'
import { Routes } from './Routes'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={defaultTheme}>
        <Routes />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
