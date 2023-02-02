import path from 'node:path'

import react from '@vitejs/plugin-react'
import tsconfigPlugin from 'vite-tsconfig-paths'
import { defaultExclude, defineConfig } from 'vitest/config'

const tsconfigPaths = tsconfigPlugin({
  projects: [path.resolve('tsconfig.json')],
})

export default defineConfig({
  plugins: [react(), tsconfigPaths],
  test: {
    coverage: {
      all: true,
      exclude: [...defaultExclude, 'build', 'out'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
})
