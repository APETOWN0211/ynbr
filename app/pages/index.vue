<template>
  <main class="layout-container">
    <canvas ref="canvas" class="dot-canvas"></canvas>

    <div class="logo-overlay">
      <img src="/logo.svg" alt="Main Logo" class="main-logo">
      <NuxtLink to="/gallery" class="gallery-link">GALLERY</NuxtLink>
    </div>

    <section class="layout-column">
      <div class="photo-box row-3"><img src="/images/ml1.png" alt="Left 1"></div>
      <div class="photo-box row-3"><img src="/images/ml2.png" alt="Left 2"></div>
      <div class="photo-box row-3"><img src="/images/ml3.png" alt="Left 3"></div>
    </section>

    <section class="layout-column">
      <div class="photo-box full-height"><img src="/images/mc.png" alt="Center"></div>
    </section>

    <section class="layout-column">
      <div class="photo-box row-3"><img src="/images/mr1.png" alt="Right 1"></div>
      <div class="photo-box row-3"><img src="/images/mr2.png" alt="Right 2"></div>
      <div class="photo-box row-3"><img src="/images/mr3.png" alt="Right 3"></div>
    </section>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
    this.size = Math.random() * 4 + 4;
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
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });
  animationFrame = requestAnimationFrame(animate);
};

const handleMouseMove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
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
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrame);
});
</script>

<style>
html, body {
  margin: 0; padding: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  background-color: #000;
}

.layout-container {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
}

.dot-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 15;
  pointer-events: none;
}

.logo-overlay {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  /* 부동 요소들이 클릭을 막지 않도록 설정 */
  pointer-events: none; 
  width: 90%;
}

.main-logo {
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: block;
}

.gallery-link {
  /* 부모의 none 설정을 무시하고 클릭을 활성화 */
  pointer-events: auto !important; 
  display: inline-block;
  margin-top: 40px;
  
  font-family: 'Helvetica', Arial, sans-serif;
  font-weight: bold;
  font-size: clamp(2rem, 5vw, 4rem);
  color: white;
  text-decoration: underline;
  text-underline-offset: 8px;
  cursor: pointer;
  
  /* 네온 깜빡임 애니메이션 */
  animation: neon-flicker 3s infinite;
}

.layout-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

@media (max-width: 1024px) {
  .layout-container { flex-direction: column; height: auto; }
  .layout-column { width: 100%; height: 33.33vh; flex-direction: row; }
}

.photo-box { width: 100%; overflow: hidden; }
.row-3 { flex: 1; }
.full-height { height: 100%; }
img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* 애니메이션 정의 */
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 12.3px #FB0187, 0 0 20px #FB0187, 0 0 30px #FB0187;
    opacity: 1;
  }
  20%, 22%, 24%, 55% {
    text-shadow: none;
    opacity: 0.5;
  }
  80% {
    text-shadow: 0 0 5px #FB0187;
    opacity: 0.8;
  }
}

.gallery-link:hover {
  animation: neon-flicker-intense 0.1s infinite;
}

@keyframes neon-flicker-intense {
  0% { text-shadow: 0 0 15px #FB0187; opacity: 1; }
  100% { text-shadow: 0 0 25px #FB0187; opacity: 0.9; }
}
</style>