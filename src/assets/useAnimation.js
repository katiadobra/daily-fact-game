// src/composables/useAnimation.js

import { animate } from 'motion'
import { nextTick } from 'vue'

/**
 * Анімувати елемент через Motion One
 * @param {Ref<Element>} elementRef - елемент, який анімуємо
 * @param {Object} keyframes - CSS властивості які анімуємо
 * @param {Object} options - налаштування анімації (duration, easing, delay і т.д.)
 */
export function useAnimation(
  elementRef,
  keyframes = { opacity: [0, 1] },
  options = { duration: 0.5 },
) {
  nextTick(() => {
    if (elementRef?.value) {
      animate(elementRef.value, keyframes, options)
    }
  })
}
