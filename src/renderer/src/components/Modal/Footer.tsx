import { Button, ModalFooter } from '@chakra-ui/react'

import { useModal } from './ModalContext'

type FooterProps = {
  isDisableSubmit: boolean
}

export function Footer(props: FooterProps) {
  const { isDisableSubmit } = props

  const { onClose } = useModal()

  return (
    <ModalFooter gap="8">
      <Button variant="ghost" colorScheme="red" onClick={onClose}>
        Fechar
      </Button>

      <Button colorScheme="green" type="submit" isDisabled={isDisableSubmit}>
        Salvar
      </Button>
    </ModalFooter>
  )
}
