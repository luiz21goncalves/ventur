import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import jotaiPluginDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiPluginReactRefresh from 'jotai/babel/plugin-react-refresh'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [
      react({
        babel: { plugins: [jotaiPluginDebugLabel, jotaiPluginReactRefresh] },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve('src/'),
      },
    },
  },
})
