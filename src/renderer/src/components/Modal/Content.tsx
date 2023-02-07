import {
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
} from '@chakra-ui/react'

type ContentProps = ModalContentProps
export function Content(props: ContentProps) {
  const { children, ...attrs } = props

  return (
    <>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent {...attrs}>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </>
  )
}
