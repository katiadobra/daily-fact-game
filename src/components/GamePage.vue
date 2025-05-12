<script setup>
const props = defineProps(['currentFact'])
const emit = defineEmits(['answered'])
</script>

<template>
  <div class="game">
    <h2>{{ props.currentFact.text }}</h2>
    <div class="buttons">
      <button @click="emit('answered', true)">True</button>
      <button @click="emit('answered', false)">False</button>
    </div>
  </div>
</template>

<style scoped>
.game {
  text-align: center;
  margin-top: 100px;
}

.buttons {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0b7dda;
}
</style>
