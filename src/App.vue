<!-- App.vue -->

<script setup>
import { ref, onMounted } from 'vue'
import LandingPage from './components/LandingPage.vue'
import GamePage from './components/GamePage.vue'
import { facts } from './assets/facts.js'

const view = ref('landing') // 'landing', 'game'
const language = ref(localStorage.getItem('language') || 'en')

const currentFact = ref(null)
const factsToday = ref(parseInt(localStorage.getItem('factsToday')) || 0)
const lastPlayedDate = ref(localStorage.getItem('lastPlayedDate') || '')

const DAILY_LIMIT = 3

// Перевірка на новий день
function checkNewDay() {
  const today = new Date().toISOString().split('T')[0]
  if (today !== lastPlayedDate.value) {
    factsToday.value = 0
    lastPlayedDate.value = today
    localStorage.setItem('lastPlayedDate', today)
    localStorage.setItem('factsToday', '0')
  }
}

// Старт гри
function startGame() {
  view.value = 'game'
  getNewFact()
}

// Отримати новий факт
function getNewFact() {
  if (factsToday.value < DAILY_LIMIT) {
    currentFact.value = facts[Math.floor(Math.random() * facts.length)]
    factsToday.value += 1
    localStorage.setItem('factsToday', factsToday.value.toString())
  } else {
    currentFact.value = null
  }
}

// Зміна мови
function toggleLanguage() {
  language.value = language.value === 'en' ? 'ua' : 'en'
  localStorage.setItem('language', language.value)
}

onMounted(() => {
  checkNewDay()
})
</script>

<template>
  <section :class="['fake-shader', view]">
    <div class="content">
      <header class="header">
        <!-- <h1>Daily Fact Game</h1> -->
        <button @click="toggleLanguage">
          {{ language === 'en' ? '🇬🇧 Switch to Ukrainian' : '🇺🇦 Переключити на англійську' }}
        </button>
      </header>

      <LandingPage v-if="view === 'landing'" @startGame="startGame" />

      <GamePage v-else :currentFact="currentFact" :language="language" @next="getNewFact" />
    </div>
  </section>
</template>

<style scoped>
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
