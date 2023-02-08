import { ReactNode } from 'react'

import { ModalContextProvider } from './ModalContext'

type RootProps = {
  children: ReactNode
}

export function Root(props: RootProps) {
  const { children } = props

  return <ModalContextProvider>{children}</ModalContextProvider>
}
