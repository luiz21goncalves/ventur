import { IconButton, useColorMode, useToken } from '@chakra-ui/react'
import { Moon, Sun } from 'phosphor-react'

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [sunColor, moonColor] = useToken('colors', ['yellow.400', 'purple.700'])

  return (
    <IconButton
      aria-label="Toggle theme"
      onClick={toggleColorMode}
      icon={
        colorMode === 'light' ? (
          <Moon weight="fill" size={20} color={moonColor} />
        ) : (
          <Sun weight="fill" size={20} color={sunColor} />
        )
      }
    />
  )
}
