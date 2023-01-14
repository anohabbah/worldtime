<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Timezone } from '../types'
import { currentOffset } from '../composables/state'

const { timezone } = defineProps({
  timezone: Object as PropType<Timezone>,
})

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
})
const numberFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'decimal',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  signDisplay: 'always',
})

const state = $computed(() => timezone.name.split('/')[0].replace(/_/g, ' '))
const city = $computed(() => timezone.name.split('/')[1]?.replace(/_/g, ' ') || '')
const offset = $computed(() => {
  const offset = timezone.offset - currentOffset.value
  return numberFormatter.format(offset)
})
const time = $computed(() => formatter.format(now.value))
</script>

<template>
  <div flex flex-wrap gap2 py1>
    <div
      w-8 ma op80 font-bold text-center
      :title="`${timezone.offset} GMT`"
    >
      {{ offset }}
    </div>
    <div flex="~ col" text-left flex-auto>
      <div>
        {{ city }}
        <sup border="~ base rounded" px1>{{ timezone.abbr }}</sup>
      </div>
      <div text-sm op50 leading-1em>
        {{ state }}
      </div>
    </div>
    <div tabular-nums>
      {{ time }}
    </div>
    <slot />
  </div>
</template>
