<!-- App.vue -->

<script setup>
import { ref, onMounted, computed } from 'vue'
import LandingPage from './components/LandingPage.vue'
import GamePage from './components/GamePage.vue'
import { facts } from './assets/facts.js'
import { translations } from './assets/i18n.js'

const view = ref('landing') // 'landing', 'game'
const language = ref(localStorage.getItem('language') || 'en')

const currentFact = ref(null)
const factsToday = ref(parseInt(localStorage.getItem('factsToday')) || 0)
const lastPlayedDate = ref(localStorage.getItem('lastPlayedDate') || '')

const t = computed(() => translations[language.value].ui)

function setLanguage(lang) {
  language.value = lang
  localStorage.setItem('language', lang)
}

const DAILY_LIMIT = 5

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
    <div class="language-switcher">
      <button @click="setLanguage('en')">🇬🇧</button>
      <button @click="setLanguage('ua')">🇺🇦</button>
      <button @click="setLanguage('de')">🇩🇪</button>
    </div>

    <div class="content">
      <LandingPage v-if="view === 'landing'" :language="language" @startGame="startGame" />
      <GamePage v-else :currentFact="currentFact" :language="language" @next="getNewFact" />
    </div>
  </section>
</template>

<style scoped>
.content {
  padding: 30px;
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

.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.language-switcher button {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.language-switcher button:hover {
  transform: scale(1.2);
}
</style>
