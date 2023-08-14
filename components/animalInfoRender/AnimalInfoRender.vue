<template>
  <p class="mb-2">
    <span class="font-medium text-gray-700 capitalize">{{ animalTag }}:</span>
    <span class="capitalize">{{ animalSpecie }} {{ options }}</span>
  </p>
</template>

<script setup>
const props = defineProps({
  animalTag: String,
  animalSpecie: String,
  options: String,
});
</script>
