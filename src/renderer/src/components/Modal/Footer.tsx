import { Button, ModalFooter } from '@chakra-ui/react'

type FooterProps = {
  onCancel: () => void

  isDisableSubmit: boolean
}

export function Footer(props: FooterProps) {
  const { onCancel, isDisableSubmit } = props

  return (
    <ModalFooter gap="8">
      <Button variant="ghost" colorScheme="red" onClick={onCancel}>
        Fechar
      </Button>

      <Button colorScheme="green" type="submit" isDisabled={isDisableSubmit}>
        Salvar
      </Button>
    </ModalFooter>
  )
}
