import { ModalHeader } from '@chakra-ui/react'

type HeaderProps = {
  children: string
}

export function Header(props: HeaderProps) {
  const { children } = props

  return <ModalHeader>{children}</ModalHeader>
}
