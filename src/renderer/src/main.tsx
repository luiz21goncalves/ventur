import { ColorModeScript, theme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  </React.StrictMode>,
)
