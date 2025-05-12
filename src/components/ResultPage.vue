<script setup>
const props = defineProps(['isCorrect'])
const emit = defineEmits(['restart'])
</script>

<template>
  <div class="result">
    <h2>{{ props.isCorrect ? 'Correct! 🎉' : 'Oops! ❌' }}</h2>
    <p v-if="props.isCorrect">You're a master of trivia.</p>
    <p v-else>Well... maybe next time 😅</p>
    <button @click="emit('restart')">Play Again</button>
  </div>
</template>

<style scoped>
.result {
  text-align: center;
  margin-top: 100px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #e64a19;
}
</style>
