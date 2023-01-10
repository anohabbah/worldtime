<script lang="ts" setup>
import Fuse from 'fuse.js'
import type { Timezone } from '../types'

const fuzzy = new Fuse(timezones, { keys: ['name'] })

let input = $ref('')
let index = $ref(0)
const searchResult = $computed(() => {
  return fuzzy.search(input).slice(0, 10)
})

const add = (timezone: Timezone) => {
  addToTimezones(timezone)
  input = ''
  index = 0
}

const onkeydown = (evt: KeyboardEvent) => {
  if (evt.key === 'ArrowDown')
    index = (index + 1 + searchResult.length) % searchResult.length

  if (evt.key === 'ArrowUp')
    index = (index - 1 + searchResult.length) % searchResult.length

  if (evt.key == 'Enter')
    add(searchResult[index].item)
}
</script>

<template>
  <div relative>
    <input
      v-model="input" type="text" placeholder="Search timezone..."
      p="x3 y1" border="~ base rounded" bg-transparent w-full
      @keydown="onkeydown"
    >
    <div v-show="input" absolute top-full bg-base p1 border="~ base" left-0 right-0 max-h-100 overflow-auto>
      <button
        v-for="(item, idx) in searchResult"
        :key="item.refIndex"
        :class="idx === index ? 'bg-gray:5' : ''"
        block w-full
        @click="add(item.item)"
      >
        <TimezoneItem :timezone="item.item" />
      </button>
    </div>
  </div>
</template>
