<script setup lang="ts">
import { computed } from 'vue';
import { calculateFoodRequirement } from '@/composables/helpers';

const animals = useAnimals();
const today = new Date().toLocaleString('default', { weekday: 'long' });

const colors = [
  'bg-blue-200',
  'bg-green-200',
  'bg-red-200',
  'bg-yellow-200',
  'bg-indigo-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-orange-200',
];

const showAllAnimals = ref(false);

const displayedAnimals = computed(() => {
  if (showAllAnimals.value || animalsToFeedToday.value.length <= 8) {
    return animalsToFeedToday.value;
  } else {
    return animalsToFeedToday.value.slice(0, 8);
  }
});

const animalsToFeedToday = computed(() => {
  return animals.value.filter((animal) => animal.weeklyChecks && animal.weeklyChecks[today]);
});

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
</script>

<template>
  <div>
    <h2>{{ today }}: {{ animalsToFeedToday.length }} Animals to Feed</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="animal in displayedAnimals" :key="animal.id" :class="[getRandomColor(), 'card']">
        <h3>{{ animal.name }}</h3>
        <p><strong>Favourite Fruit:</strong> {{ animal.favouriteFruit }}</p>
        <p>
          <strong>Food required:</strong>
          {{ calculateFoodRequirement(animal) }} Kg
        </p>
      </div>
    </div>

    <button
      v-if="animalsToFeedToday.length > 8 && !showAllAnimals"
      @click="showAllAnimals = true"
      class="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
    >
      Show More Animals
    </button>

    <button
      v-if="showAllAnimals"
      @click="showAllAnimals = false"
      class="mt-4 px-4 py-2 rounded bg-gray-400 text-white"
    >
      Show Less
    </button>
  </div>
</template>

<style scoped>
.card {
  @apply p-6 rounded shadow-md border border-gray-200;
}
</style>
