// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ensure webcrypto available for Vite/PostCSS URL hashing in Node
if (typeof globalThis.crypto === 'undefined') {
  // Node 16.5+ has crypto.webcrypto
  const { webcrypto } = await import('node:crypto')
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [react()],
})