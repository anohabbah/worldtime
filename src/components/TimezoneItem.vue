<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Timezone } from '../types'

const { timezone } = defineProps({
  timezone: Object as PropType<Timezone>,
})

const state = $computed(() => timezone.name.split('/')[0])
const city = $computed(() => timezone.name.split('/')[1])
const offset = $computed(() => new Intl.NumberFormat('fr-FR', {
  style: 'decimal',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  signDisplay: 'always',
})
  .format(timezone.offset))
</script>

<template>
  <div flex gap2 py1>
    <div w-8 ma op80 font-bold>
      {{ offset }}
    </div>
    <div flex="~ col" text-left flex-auto>
      <div>
        {{ city }}
      </div>
      <div text-sm op50 leading-1em>
        {{ state }}
      </div>
    </div>
  </div>
</template>
