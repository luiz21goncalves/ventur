import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'

import { ToggleTheme } from '../ToggleTheme'

export function Default() {
  const backgroundColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box w="100vw" h="100vh" bgColor={backgroundColor}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100vw"
        maxWidth="container.lg"
        h="100vh"
        mx="auto"
        p="8"
      >
        <HStack w="full" justify="space-between" mb="16">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/student/create">
                Novo Aluno
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <ToggleTheme />
        </HStack>

        <Box w="full" height="container.md">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}
