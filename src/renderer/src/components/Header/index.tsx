import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  SystemStyleObject,
  useColorModeValue,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { ToggleTheme } from '../ToggleTheme'

const LINKS = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Novo Aluno',
    to: '/student/create',
  },
]

export function Header() {
  const linkColor = useColorModeValue('gray.500', 'gray.600')
  const activeLinkColor = useColorModeValue('gray.800', 'gray.400')

  const activeStyles = getActiveLinkStyles(activeLinkColor)

  return (
    <HStack w="full" justify="space-between" borderRadius="lg" mb="16">
      <Breadcrumb fontWeight="semibold" fontSize="lg" color={linkColor}>
        {LINKS.map((link) => {
          return (
            <BreadcrumbItem key={link.label}>
              <BreadcrumbLink
                as={NavLink}
                to={link.to}
                _activeLink={activeStyles}
              >
                {link.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>

      <ToggleTheme />
    </HStack>
  )
}

const getActiveLinkStyles = (activeLinkColor: string): SystemStyleObject => {
  return {
    color: activeLinkColor,
  }
}
