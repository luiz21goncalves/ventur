import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import jotaiPluginDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiPluginReactRefresh from 'jotai/babel/plugin-react-refresh'
import tsconfigPlugin from 'vite-tsconfig-paths'

const tsconfigPaths = tsconfigPlugin({
  projects: [path.resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [
      tsconfigPaths,
      react({
        babel: { plugins: [jotaiPluginDebugLabel, jotaiPluginReactRefresh] },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('src/'),
      },
    },
  },
})
