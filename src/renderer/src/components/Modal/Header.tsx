import { ModalHeader } from '@chakra-ui/react'
import { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
}

export function Header(props: HeaderProps) {
  const { children } = props

  return <ModalHeader>{children}</ModalHeader>
}
