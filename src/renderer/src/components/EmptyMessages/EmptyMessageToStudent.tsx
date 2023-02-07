import { Center, Text, useColorModeValue } from '@chakra-ui/react'

export function EmptyMessageToStudent() {
  const textColor = useColorModeValue('gray.400', 'gray.600')

  return (
    <Center w="full" flexDir="column">
      <Text color={textColor}>Não há nenhum aluno.</Text>
    </Center>
  )
}
