<script setup lang="ts">
import { computed } from 'vue';

import { calculateFoodRequirement } from '../../composables/helpers';

const animals = useAnimals();
const routeObject = useRoute();

const param = routeObject.params;
const hideButtons: boolean = param._dayOfMonth ? true : false;
const dayOfMonth: number = Number(param._dayOfMonth);
const today = new Date().toLocaleString('default', { weekday: 'long' });
const date = new Date().toLocaleDateString('default', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

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

const dayOfWeekForGivenDate: Ref<string | null> = computed(() => {
  if (!dayOfMonth || isNaN(dayOfMonth)) return null;

  const dateForGivenDay = new Date();
  dateForGivenDay.setDate(dayOfMonth);
  return dateForGivenDay.toLocaleString('default', { weekday: 'long' }) as string;
});

const animalsToFeedOnGivenDay = computed(() => {
  if (!dayOfWeekForGivenDate.value) return [];

  return animals.value.filter(
    (animal) => animal.weeklyChecks && animal.weeklyChecks[dayOfWeekForGivenDate.value],
  );
});

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const fullDate: Ref<Date | null> = computed(() => {
  if (!dayOfMonth || isNaN(dayOfMonth)) return null;

  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth);
});

const formattedDate: Ref<string | null> = computed(() => {
  return (
    fullDate.value?.toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) || null
  );
});

//TODO: Abstract functions into helpers and expand unit tests.
</script>

<template>
  <div>
    <h2 v-if="!hideButtons" class="text-xl mb-4 text-gray-800">
      {{ today }} ({{ date }}): {{ animalsToFeedToday.length }} Animals to Feed
    </h2>

    <div v-if="!hideButtons" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="animal in displayedAnimals" :key="animal.id" :class="[getRandomColor(), 'card']">
        <nuxt-link :to="`/animal/${animal.id}`">
          <h3>{{ animal.name }}</h3>
          <p class="capitalize"><strong>Favourite Fruit:</strong> {{ animal.favouriteFruit }}</p>
          <p>
            <strong>Food required:</strong>
            {{ calculateFoodRequirement(animal) }} Kg
          </p>
        </nuxt-link>
      </div>
    </div>

    <div v-else class="mx-4 md:mx-12 lg:mx-24">
      <h2 v-if="formattedDate" class="text-xl mb-4 text-gray-800">
        {{ formattedDate }}: {{ animalsToFeedOnGivenDay.length }} Animals to Feed
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="animal in animalsToFeedOnGivenDay"
          :key="animal.id"
          :class="[getRandomColor(), 'card hover']"
        >
          <nuxt-link :to="`/animal/${animal.id}`">
            <h3>{{ animal.name }}</h3>
            <p class="capitalize"><strong>Favourite Fruit:</strong> {{ animal.favouriteFruit }}</p>
            <p>
              <strong>Food required:</strong>
              {{ calculateFoodRequirement(animal) }} Kg
            </p>
          </nuxt-link>
        </div>
      </div>
    </div>

    <button
      v-if="!hideButtons && animalsToFeedToday.length > 8 && !showAllAnimals"
      @click="showAllAnimals = true"
      class="mt-4 px-4 py-2 rounded bg-blue-500 text-white"
    >
      Show More Animals
    </button>

    <button
      v-if="!hideButtons && showAllAnimals"
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
  transition: background-color 0.3s ease;
}

.card:hover {
  background-color: #d1d1d1;
  position: relative;
  z-index: 2;
}
</style>
