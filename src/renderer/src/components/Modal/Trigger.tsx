import { Button, ButtonProps } from '@chakra-ui/react'

type TriggerProps = ButtonProps

export function Trigger(props: TriggerProps) {
  const { children, ...attrs } = props

  return (
    <Button variant="outline" colorScheme="blue" {...attrs}>
      {children}
    </Button>
  )
}
