<!-- GamePage.vue -->

<script setup>
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { translations } from '@/assets/i18n'

const props = defineProps(['currentFact', 'language'])
const emit = defineEmits(['next'])

const answered = ref(false)
const isCorrect = ref(null)

const t = computed(() => translations[props.language].game)

function handleAnswer(userAnswer) {
  if (props.currentFact) {
    isCorrect.value = userAnswer === props.currentFact.isTrue
    answered.value = true
  }
}

function nextFact() {
  answered.value = false
  isCorrect.value = null
  emit('next')
}
</script>

<template>
  <div class="game">
    <template v-if="currentFact">
      <!-- Питання -->
      <motion.h2
        :initial="{ opacity: 0, y: -20, fontSize: '45px' }"
        :animate="{
          opacity: answered ? 0.6 : 1,
          y: 0,
          fontSize: answered ? '30px' : '45px',
        }"
        :transition="{ duration: 1 }"
      >
        {{ currentFact.text[language] }}
      </motion.h2>

      <!-- Якщо ще не відповіли -->
      <motion.div v-if="!answered" class="buttons">
        <motion.button
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.3, delay: 0.2 }"
          @click="handleAnswer(true)"
        >
          ✅
        </motion.button>

        <motion.button
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.3, delay: 0.4 }"
          @click="handleAnswer(false)"
        >
          ❌
        </motion.button>
      </motion.div>

      <!-- Якщо відповів -->
      <motion.div v-else class="result">
        <motion.h2
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
        >
          {{ isCorrect ? t.correct : t.incorrect }}
        </motion.h2>

        <motion.p
          class="explanation"
          :initial="{ opacity: 0, y: 20, filter: 'blur(8px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 1.2, delay: 0.8, easing: 'ease-out' }"
        >
          {{ currentFact.explanation[language] }}
        </motion.p>

        <motion.button
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, delay: 0.5 }"
          @click="nextFact"
        >
          {{ t.next }}
        </motion.button>
      </motion.div>
    </template>

    <!-- Якщо сьогодні вже все -->
    <template v-else>
      <motion.h2
        :initial="{ opacity: 0, y: -20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        {{ t.comeBack }}
      </motion.h2>
    </template>
  </div>
</template>

<style scoped>
.game {
  text-align: center;
  margin-top: 80px;
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
  padding: clamp(20px, 40px, 60px);
  font-size: clamp(1rem, 1.5rem, 2rem);
}
</style>
