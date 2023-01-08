<script lang="ts" setup>
import Fuse from 'fuse.js'
import { timezones } from '../composables/data'
import { addToTimezones } from '../composables/state'
import type { Timezone } from '../types'

const fuzzy = new Fuse(timezones, { keys: ['name'] })

const input = ref('')
const index = ref(0)
const searchResult = computed(() => {
  return fuzzy.search(input.value)
})

const add = (timezone: Timezone) => {
  addToTimezones(timezone)
  input.value = ''
  index.value = 0
}
</script>

<template>
  <div relative>
    <input v-model="input" type="text" placeholder="Search timezone..." px2 py1 border="~ gray/15 rounded" bg-transparent w-full>
    <div v-show="input" absolute top-full left-0 right-0 bg-gray-900>
      <button v-for="item in searchResult" :key="item.refIndex" flex gap2 @click="addToTimezones(item.item)">
        <div font-mono w-10 text-right>
          {{ item.item.offset }}
        </div>
        <div>{{ item.item.name }}</div>
      </button>
    </div>
  </div>
</template>
