<template>
  <main class="layout-container">
    <div class="logo-overlay">
      <img src="/logo.svg" alt="Main Logo" class="main-logo">
      <NuxtLink to="/gallery" class="gallery-link">GALLERY</NuxtLink>
    </div>

    <section class="layout-column">
      <div class="photo-box row-3">
        <img src="/images/ml1.png" alt="Left Top">
      </div>
      <div class="photo-box row-3">
        <img src="/images/ml2.png" alt="Left Middle">
      </div>
      <div class="photo-box row-3">
        <img src="/images/ml3.png" alt="Left Bottom">
      </div>
    </section>

    <section class="layout-column">
      <div class="photo-box full-height">
        <img src="/images/mc.png" alt="Center Full">
      </div>
    </section>

    <section class="layout-column">
      <div class="photo-box row-3">
        <img src="/images/mr1.png" alt="Right Top">
      </div>
      <div class="photo-box row-3">
        <img src="/images/mr2.png" alt="Right Middle">
      </div>
      <div class="photo-box row-3">
        <img src="/images/mr3.png" alt="Right Bottom">
      </div>
    </section>
  </main>
</template>

<style>
/* 브라우저 기본 여백 완전히 제거 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
}

.layout-container {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
}

.logo-overlay {
  /* 화면 정중앙 배치 및 세로 정렬 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  z-index: 10;
  pointer-events: none;
}

.main-logo {
  width: 1200px;
  height: auto;
  display: block;
}

.gallery-link {
  pointer-events: auto; /* 텍스트 클릭 가능 */
  margin-top: 40px;     /* 로고와의 간격 */
  
  font-family: 'Helvetica', Arial, sans-serif;
  font-weight: bold;
  font-size: 64px;
  color: #000;
  text-decoration: underline;
  text-underline-offset: 8px;
  
  /* Figma DropShadow: y0 x0 FB0187 100% blur 12.3 */
  text-shadow: 0 0 12.3px #FB0187;
  cursor: pointer;
}

.layout-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.photo-box {
  width: 100%;
  overflow: hidden;
}

/* 좌/우측 3등분 높이 설정 */
.row-3 {
  flex: 1;
}

/* 중앙 전체 높이 */
.full-height {
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>