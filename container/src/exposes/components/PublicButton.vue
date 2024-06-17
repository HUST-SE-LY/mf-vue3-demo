<template>
  <button class="text-red" @click="handleChange">click me</button>
</template>

<script setup lang="ts">
const handleChange = () => {
  alert("i'm the public button from container!")
}
</script>

<style scoped>
.text-red {
  color: red;
}
</style>