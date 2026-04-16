<template>
  <main class="layout-container">
    <canvas ref="canvas" class="dot-canvas"></canvas>

    <div class="logo-overlay">
      <img src="/logo.svg" alt="Main Logo" class="main-logo">
      <NuxtLink to="/gallery" class="gallery-link">GALLERY</NuxtLink>
    </div>

    <div class="content-wrapper">
      <section class="layout-column">
        <div class="photo-box"><img src="/images/ml1.png" alt="Left 1"></div>
        <div class="photo-box"><img src="/images/ml2.png" alt="Left 2"></div>
        <div class="photo-box"><img src="/images/ml3.png" alt="Left 3"></div>
      </section>

      <section class="layout-column center-column">
        <div class="photo-box center-full"><img src="/images/mc.png" alt="Center"></div>
      </section>

      <section class="layout-column">
        <div class="photo-box"><img src="/images/mr1.png" alt="Right 1"></div>
        <div class="photo-box"><img src="/images/mr2.png" alt="Right 2"></div>
        <div class="photo-box"><img src="/images/mr3.png" alt="Right 3"></div>
      </section>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 뷰포트 메타 태그 설정 (반응형 필수)
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
  ]
});

const canvas = ref(null);
let ctx, animationFrame;
const dots = [];
const mouse = { x: -1000, y: -1000 };

const yMap = [
  {x:-2, y:-3}, {x:2, y:-3}, {x:-1.5, y:-2.25}, {x:1.5, y:-2.25},
  {x:-1, y:-1.5}, {x:1, y:-1.5}, {x:-0.5, y:-0.75}, {x:0.5, y:-0.75},
  {x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}
];

class Dot {
  constructor(offsetX, offsetY) {
    this.offsetX = offsetX * 25;
    this.offsetY = offsetY * 25;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 3 + 3;
    this.ease = 0.12;
  }
  update() {
    const targetX = mouse.x + this.offsetX;
    const targetY = mouse.y + this.offsetY;
    this.x += (targetX - this.x) * this.ease;
    this.y += (targetY - this.y) * this.ease;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FC008A';
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FC008A';
  }
}

const animate = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });
  animationFrame = requestAnimationFrame(animate);
};

const handleInput = (e) => {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  mouse.x = clientX;
  mouse.y = clientY;
};

const handleResize = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  }
};

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  handleResize();
  yMap.forEach(pos => dots.push(new Dot(pos.x, pos.y)));
  window.addEventListener('mousemove', handleInput);
  window.addEventListener('touchmove', handleInput);
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleInput);
  window.removeEventListener('touchmove', handleInput);
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrame);
});
</script>

<style>
html, body {
  margin: 0; padding: 0;
  width: 100%;
  background-color: #000;
  overflow-x: hidden;
}

.layout-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

/* 마우스 이펙트 배경 고정 */
.dot-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 5;
  pointer-events: none;
}

/* 중앙 로고 & 텍스트: 항상 화면 정중앙 고정 */
.logo-overlay {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50; /* 사진보다 위에 위치 */
  pointer-events: none;
  width: 90%;
  max-width: 1000px;
}

.main-logo {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-link {
  pointer-events: auto !important;
  margin-top: 2rem;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  font-size: clamp(1.8rem, 6vw, 3.5rem);
  color: white;
  text-decoration: underline;
  text-underline-offset: 10px;
  animation: neon-flicker 3s infinite;
}

/* 콘텐츠 영역 레이아웃 */
.content-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
}

.layout-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.photo-box {
  flex: 1;
  overflow: hidden;
}

.photo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --- 모바일/패드 반응형 (세로 정렬) --- */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    height: auto; /* 세로로 길어지도록 설정 */
  }

  .layout-column {
    width: 100%;
    height: auto;
  }

  .photo-box {
    height: 60vh; /* 모바일에서 사진 한 장의 높이 */
    width: 100%;
  }

  /* 중앙의 큰 이미지는 더 강조하고 싶을 경우 */
  .center-column .photo-box {
    height: 80vh;
  }
}

/* 네온 애니메이션 */
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 15px #FB0187, 0 0 25px #FB0187;
    opacity: 1;
  }
  20%, 22%, 24%, 55% { text-shadow: none; opacity: 0.6; }
}
</style>