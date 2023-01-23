import { extendTheme, StyleFunctionProps, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

export const defaultTheme = extendTheme({
  config,
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
