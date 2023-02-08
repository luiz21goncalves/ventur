import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'

type ModalContextProviderProps = {
  children: ReactNode
}

type ModalContextData = UseDisclosureReturn

const ModalContext = createContext({} as ModalContextData)

function ModalContextProvider(props: ModalContextProviderProps) {
  const { children } = props

  const disclosure = useDisclosure()

  return (
    <ModalContext.Provider value={disclosure}>{children}</ModalContext.Provider>
  )
}

function useModal() {
  return useContext(ModalContext)
}

export { ModalContextProvider, useModal }
