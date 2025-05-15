<!-- GamePage.vue -->

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['currentFact', 'language'])
const emit = defineEmits(['answered'])

const answered = ref(false)
const isCorrect = ref(null)

const factText = computed(() => props.currentFact.text[props.language])
const factExplanation = computed(() => props.currentFact.explanation[props.language])

function handleAnswer(userAnswer) {
  isCorrect.value = userAnswer === props.currentFact.isTrue
  answered.value = true
}

function nextFact() {
  answered.value = false
  isCorrect.value = null
  emit('answered', true) // просто сигналізуємо батьківському компоненту, що готові до наступного факту
}
</script>

<template>
  <div class="game">
    <h2>{{ factText }}</h2>

    <div v-if="!answered" class="buttons">
      <button @click="handleAnswer(true)">✅</button>
      <button @click="handleAnswer(false)">❌</button>
    </div>

    <div v-else class="result">
      <h2>{{ isCorrect ? 'Correct! 🎉' : 'Oops! ❌' }}</h2>
      <div class="explanation">
        <p>{{ factExplanation }}</p>
      </div>
      <button @click="nextFact">Random Fact</button>
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
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
}

button:hover {
  background: #0b7dda;
}

.result {
  margin-top: 30px;
}

.explanation {
  margin-top: 20px;
  padding: 10px;
}
</style>
