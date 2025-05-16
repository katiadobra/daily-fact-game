<script setup>
import { motion } from 'motion-v'
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { translations } from '@/assets/i18n'

const props = defineProps(['language'])
const emit = defineEmits(['startGame'])

const t = computed(() => translations[props.language].landing)

const title = computed(() => (props.language === 'en' ? 'Are You Sure?' : 'Ти впевнений?'))
const description = computed(() =>
  props.language === 'en'
    ? 'A daily dose of doubt. Choose wisely.'
    : 'Щоденна доза сумніву. Обирай обережно.',
)
const startButton = computed(() => (props.language === 'en' ? 'Start' : 'Почати'))
</script>

<template>
  <div class="landing">
    <motion.h1
      :initial="{ opacity: 0, y: 20, filter: 'blur(6px)' }"
      :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 1.5, easing: 'ease-out' }"
    >
      {{ t.title }}
    </motion.h1>

    <motion.p
      class="description"
      :initial="{ opacity: 0, y: 30, filter: 'blur(8px)' }"
      :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :transition="{ duration: 1.9, delay: 0.5, easing: 'ease-out' }"
    >
      {{ t.description }}
    </motion.p>

    <motion.button
      class="start-btn"
      :initial="{ opacity: 0, scale: 0.8 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 2, delay: 2 }"
      @click="emit('startGame')"
    >
      {{ t.start }}
    </motion.button>
  </div>
</template>

<style scoped>
.landing {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 1rem;
}

.description {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  opacity: 0.7;
  margin-bottom: 2rem;
  color: #535d66;
}

.start-btn {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: 2px solid #262b29;
  background-color: transparent;
  color: #262b29;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: #262b29;
  color: #f5e7da;
}
</style>
