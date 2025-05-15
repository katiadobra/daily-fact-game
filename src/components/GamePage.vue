<!-- GamePage.vue -->

<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'

const props = defineProps(['currentFact', 'language'])
const emit = defineEmits(['next'])

const answered = ref(false)
const isCorrect = ref(null)

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
          opacity: 1,
          y: 0,
          fontSize: answered ? '30px' : '45px',
        }"
        :transition="{ duration: 0.5 }"
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
          {{ isCorrect ? 'Correct! 🎉' : 'Oops! ❌' }}
        </motion.h2>

        <motion.p
          class="explanation"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          >{{ currentFact.explanation[language] }}
        </motion.p>

        <motion.button
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.4, delay: 0.5 }"
          @click="nextFact"
        >
          Next Fact
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
        {{
          language === 'en'
            ? 'Come back tomorrow for more doubt!'
            : 'Повертайся завтра за новою порцією сумніву!'
        }}
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
  padding: 10px;
  font-size: 28px;
}
</style>
