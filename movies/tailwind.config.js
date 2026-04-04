/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내 모든 파일을 감시
    "./pages/**/*.{js,ts,jsx,tsx}", // 혹시 src 밖에 pages가 있다면 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}