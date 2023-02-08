import { Button, ButtonProps } from '@chakra-ui/react'

import { useModal } from './ModalContext'

type TriggerProps = ButtonProps

export function Trigger(props: TriggerProps) {
  const { children, ...attrs } = props

  const { onOpen } = useModal()

  return (
    <Button variant="outline" colorScheme="blue" onClick={onOpen} {...attrs}>
      {children}
    </Button>
  )
}
