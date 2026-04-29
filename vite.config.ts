import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ✨ 1. 이 부분이 임포트 되어야 합니다.

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✨ 2. 플러그인 배열 안에도 추가되어야 합니다.
  ],
})