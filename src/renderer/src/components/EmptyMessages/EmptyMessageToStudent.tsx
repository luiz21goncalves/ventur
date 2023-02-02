import { Center, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

type EmptyMessageToStudentProps = {
  hasLink?: boolean
}

export function EmptyMessageToStudent(props: EmptyMessageToStudentProps) {
  const { hasLink = false } = props

  const textColor = useColorModeValue('gray.400', 'gray.600')
  const linkColor = useColorModeValue('blue.400', 'blue.600')

  return (
    <Center w="full" flexDir="column">
      <Text color={textColor}>Não há nenhum aluno</Text>
      {hasLink && (
        <Text color={textColor}>
          <Link as={RouterLink} to="/student/create" color={linkColor}>
            clique aqui
          </Link>{' '}
          e adicione seu primeiro aluno
        </Text>
      )}
    </Center>
  )
}
