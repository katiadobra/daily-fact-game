<script setup>
const emit = defineEmits(['startGame'])
</script>

<template>
  <div class="landing">
    <h1>Are You Sure?</h1>
    <p class="description">A daily dose of doubt. Choose wisely.</p>
    <button class="start-btn" @click="emit('startGame')">Start</button>
  </div>
</template>

<style scoped>
.landing {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 1rem;
}

p.description {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  opacity: 0.7;
  margin-bottom: 2rem;
}

.start-btn {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: 2px solid #262b29;
  background-color: transparent;
  color: #262b29;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: #262b29;
  color: #f5e7da;
}
</style>
