<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Timezone } from '../types'

const { timezone } = defineProps({
  timezone: Object as PropType<Timezone>,
})

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
})

const state = $computed(() => timezone.name.split('/')[0].replace(/_/, ' '))
const city = $computed(() => timezone.name.split('/')[1].replace(/_/, ' '))
const offset = $computed(() => new Intl.NumberFormat('fr-FR', {
  style: 'decimal',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  signDisplay: 'always',
})
  .format(timezone.offset))
const time = $computed(() => formatter.format(now.value))
</script>

<template>
  <div flex gap2 py1>
    <div w-8 ma op80 font-bold>
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
  </div>
</template>
