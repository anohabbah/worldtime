<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Timezone } from '../types'
import { homeOffset } from '../composables/state'

const { timezone } = defineProps({
  timezone: Object as PropType<Timezone>,
})

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
})
const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  signDisplay: 'always',
})

const state = $computed(() => timezone.name.split('/')[0].replace(/_/g, ' '))
const city = $computed(() => timezone.name.split('/')[1]?.replace(/_/g, ' ') || '')
const offset = $computed(() => {
  const offset = timezone.offset - homeOffset.value
  return numberFormatter.format(offset)
})
const time = $computed(() => formatter.format(now.value))
</script>

<template>
  <div flex="~ col lg:row" gap3 py1>
    <div flex="~ wrap">
      <div
        w-8 ma op80 font-bold text-center
        :title="`${timezone.offset} GMT`"
      >
        <div v-if="timezone.name === homeZone" i-ri-home-2-fill op50 ma />
        <div v-else text-sky6>
          {{ offset }}
        </div>
      </div>
      <div flex="~ col" text-left flex-auto w-30>
        <div>
          {{ city }}
          <sup border="~ base rounded" px1>{{ timezone.abbr }}</sup>
        </div>
        <div text-sm op50 leading-1em>
          {{ state }}
        </div>
      </div>
      <div tabular-nums ma text-sm w-20>
        {{ time }}
      </div>
    </div>
    <slot />
  </div>
</template>
