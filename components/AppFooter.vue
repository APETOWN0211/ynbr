<template>
  <footer class="app-footer">
    <p>© soborodesign copyright</p>
  </footer>
</template>

<style scoped>
.app-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 푸터 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8); /* 배경 사진을 살짝 비치게 하려면 투명도 조절 */
  z-index: 30; /* 캔버스와 로고보다 위에 오도록 설정 */
  pointer-events: none; /* 마우스 이펙트를 방해하지 않으려면 설정 */
}

.app-footer p {
  color: #555; /* 너무 튀지 않는 회색 톤 */
  font-family: 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  margin: 0;
}
</style>