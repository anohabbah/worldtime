<script lang="ts" setup>
const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <button i-carbon-sun dark:i-carbon-moon @click="toggle()" />
</template>
