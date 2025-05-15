<!-- App.vue -->

<script setup>
import { ref } from 'vue'
import LandingPage from './components/LandingPage.vue'
import GamePage from './components/GamePage.vue'
import ResultPage from './components/ResultPage.vue'
import { facts } from './assets/facts.js'

const view = ref('landing') // 'landing', 'game', 'result'
const currentFact = ref(null)
const isCorrect = ref(null)
const language = ref(localStorage.getItem('language') || 'en')

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

// Switch language and save to localStorage
function toggleLanguage() {
  language.value = language.value === 'en' ? 'ua' : 'en'
  localStorage.setItem('language', language.value)
}
</script>

<template>
  <section :class="['fake-shader', view]">
    <div class="content">
      <header class="header">
        <button @click="toggleLanguage">
          {{ language === 'en' ? '🇬🇧 Switch to Ukrainian' : '🇺🇦 Переключити на англійську' }}
        </button>
      </header>

      <LandingPage v-if="view === 'landing'" @startGame="startGame" />

      <GamePage
        v-else-if="view === 'game'"
        :currentFact="currentFact"
        :language="language"
        @answered="checkAnswer"
      />

      <ResultPage
        v-else
        :isCorrect="isCorrect"
        :explanation="currentFact.explanation[language]"
        @restart="restartGame"
      />
    </div>
  </section>
</template>

<style scoped>
* {
  transition: all 0.3s ease;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #673ab7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #5e35b1;
}
</style>
