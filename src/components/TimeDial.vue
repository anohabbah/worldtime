<script setup lang="ts">
import { format } from 'date-fns'
import type { Timezone } from '../types'

const props = defineProps<{
  timezone: Timezone
}>()

const hours = $computed(() => {
  return Array.from({ length: 24 }, (_, i) => i + props.timezone.offset + 1)
})

const days = $computed(() => [
  hours.filter(i => i < 0).map(i => (i + 24) % 24),
  hours.filter(i => i >= 0 && i < 24),
  hours.filter(i => i >= 24).map(i => (i + 24) % 24),
])

function isMidnight(h: number) {
  return h <= 5 || h >= 22
}

function isNight(h: number) {
  return h <= 7 || h >= 18
}
</script>

<template>
  <div flex="~ gap1" of-auto items-center>
    <template
      v-for="(day, idx) in days" :key="idx"
    >
      <div v-if="day.length" flex="~" border="~ sky7/30 rounded" of-hidden>
        <div
          v-for="i in day" :key="i"
          flex="~ col none"
          w7 h8
          items-center justify-center
          :class="[isMidnight(i) ? 'bg-sky7/70 text-white' : isNight(i) ? 'bg-sky/20' : '']"
        >
          <div v-if="i">
            {{ i }}
          </div>
          <div v-else text-xs leading-1em text-center>
            {{ format(new Date(), 'MMM') }}
            {{ format(new Date(), 'dd') }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
