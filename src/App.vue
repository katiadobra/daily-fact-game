<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import GamePage from './components/GamePage.vue'
import ResultPage from './components/ResultPage.vue'
import { facts } from './assets/facts.js'

const view = ref('landing') // 'landing', 'game', 'result'
const currentFact = ref(null)
const isCorrect = ref(null)

// Start game: pick random fact
function startGame() {
  const randomIndex = Math.floor(Math.random() * facts.length)
  currentFact.value = facts[randomIndex]
  view.value = 'game'
}

// After answering
function checkAnswer(answer) {
  isCorrect.value = answer === currentFact.value.isTrue
  view.value = 'result'
}

// Restart
function restartGame() {
  view.value = 'landing'
  currentFact.value = null
  isCorrect.value = null
}
</script>

<template>
  <LandingPage v-if="view === 'landing'" @startGame="startGame" />
  <GamePage v-else-if="view === 'game'" :currentFact="currentFact" @answered="checkAnswer" />
  <ResultPage v-else :isCorrect="isCorrect" @restart="restartGame" />
</template>

<style scoped>
/* Add a simple fade in transition */
* {
  transition: all 0.3s ease;
}
</style>
