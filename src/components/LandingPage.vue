<script setup>
const emit = defineEmits(['startGame'])
</script>

<template>
  <div class="landing">
    <h1>Are You Sure?</h1>
    <p>A daily dose of doubt. Choose wisely.</p>
    <button @click="emit('startGame')">Start</button>
  </div>
</template>

<style scoped>
.landing {
  text-align: center;
  margin-top: 100px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style>
