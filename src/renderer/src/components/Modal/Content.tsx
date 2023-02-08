import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
} from '@chakra-ui/react'

import { useModal } from './ModalContext'

type ContentProps = ModalContentProps
export function Content(props: ContentProps) {
  const { children, ...attrs } = props

  const { isOpen, onClose } = useModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" autoFocus isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent {...attrs}>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  )
}
