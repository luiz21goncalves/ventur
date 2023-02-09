import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const defaultTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      '*': {
        '&::-webkit-scrollbar': {
          backgroundColor: mode('blackAlpha.50', 'whiteAlpha.50')(props),
          borderRadius: '6px',
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: mode('blackAlpha.200', 'whiteAlpha.200')(props),
          borderRadius: '6px',
        },
      },
    }),
  },
})
