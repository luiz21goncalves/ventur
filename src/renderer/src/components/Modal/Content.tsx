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
      <ModalOverlay />
      <ModalContent {...attrs}>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </>
  )
}
