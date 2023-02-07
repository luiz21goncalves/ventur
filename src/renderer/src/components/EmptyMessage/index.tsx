import { Center, Text, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

type EmptyMessageProps = {
  children: ReactNode
}

export function EmptyMessage(props: EmptyMessageProps) {
  const { children } = props

  const textColor = useColorModeValue('gray.400', 'gray.600')

  return (
    <Center w="full" flexDir="column">
      <Text color={textColor}>{children}</Text>
    </Center>
  )
}
