export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  
  // components: true는 Nuxt 3/4에서 기본값이므로 생략 가능합니다.
  
  // @/ 대신 ./ 를 사용하여 상대 경로로 직접 지정하세요.
  css: ['./assets/css/main.css']
})