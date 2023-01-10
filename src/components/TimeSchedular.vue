<script setup lang="ts">
</script>

<template>
  <div>
    <div
      v-for="(zone, idx) in zones"
      :key="idx"
      px4 py2
      border="b base" relative
    >
      <TimezoneItem :timezone="zone" />

      <div class="absolute" left="-30px" top-0 bottom-0 text-xl flex="~ col" justify-center>
        <button
          icon-btn m--1px i-carbon-close
          title="Remove"
          @click="remove(zone)"
        />
        <button
          v-if="idx !== 0"
          icon-btn m--1px i-carbon-caret-up
          title="Move up"
          @click="move(zone, -1)"
        />
        <button
          v-if="idx !== zones.length - 1"
          icon-btn m--1px i-carbon-caret-down
          title="Move down"
          @click="move(zone, +1)"
        />
      </div>
    </div>
  </div>
</template>
