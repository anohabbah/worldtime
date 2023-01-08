<script lang="ts" setup>
</script>

<template>
  <div text-sans bg-canvas h-screen>
    <NavBar />
    <div border="~ base rounded" m2 p2 bg-base shadow>
      <ActionBar />
      <TimeSchedular />
    </div>
  </div>
</template>

<style>
html.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
