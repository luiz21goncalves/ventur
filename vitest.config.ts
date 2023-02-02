import react from '@vitejs/plugin-react'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
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
