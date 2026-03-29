// 1. Vite의 설정 양식을 가져옵니다. (자동 완성을 도와줘요)
import { defineConfig } from 'vite'

// 2. "리액트"라는 부품을 가져옵니다. (Vite가 .tsx 파일을 이해하게 해줌)
import react from '@vitejs/plugin-react'

// 3. "테일윈드"라는 부품을 가져옵니다. (Vite가 Tailwind CSS를 처리하게 해줌)
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 4. 플러그인(추가 기능) 목록입니다.
  plugins: [
    react(),      // "Vite야, 리액트 기능 켜줘!"
    tailwindcss(), // "Vite야, 테일윈드 기능도 켜줘!"
  ],
})
