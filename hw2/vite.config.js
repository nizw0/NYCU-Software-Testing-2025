import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['attachments/**', 'vite.config.js'],
      reportsDirectory: './coverage',
    },
  },
})
