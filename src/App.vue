<script lang="ts" setup>
import { zones } from './composables/state'
</script>

<template>
  <div border="~ gray/20 m2 p2">
    <ActionBar />
    <TimeSchedular />
  </div>
</template>

<style>
html {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
