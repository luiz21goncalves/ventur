import { Modal as ChakraModal } from '@chakra-ui/react'
import { ReactNode } from 'react'

type RootProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Root(props: RootProps) {
  const { isOpen, onClose, children } = props

  return (
    <ChakraModal
      size="xl"
      autoFocus
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </ChakraModal>
  )
}
