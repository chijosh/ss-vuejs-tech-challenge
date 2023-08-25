<script lang="ts"></script>

<script setup lang="ts">
import { format, getDay, getDaysInMonth } from 'date-fns';
import { computed, ref } from 'vue';

import { Animal, CalendarEntry, Days, FoodRequirement } from '../../types';
import CalendarCard from './CalendarCard.vue';

const currentDate = ref(new Date());
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const animals = ref(useAnimals());

const currentMonth = computed(() => {
  return format(currentDate.value, 'MMMM');
});

const startingEmptyDays = computed(() => {
  const firstDayOfMonth = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1,
  );
  return getDay(firstDayOfMonth);
});

const entries = computed<CalendarEntry[]>(() => {
  return Array.from({ length: getDaysInMonth(currentDate.value) }, (_, i) => {
    const current = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i + 1);
    const dayName = getWeekDayName(current);

    const animalsToFeedToday = animals.value.filter(
      (animal: Animal) => animal.weeklyChecks && animal.weeklyChecks[dayName],
    );

    const feedCount = animalsToFeedToday.length;

    const totalFoodForTheDay = animalsToFeedToday.reduce<FoodRequirement>((accum, animal) => {
      const foodRequirement = calculateFoodRequirement(animal);
      const fruit = animal.favouriteFruit?.toLowerCase();
      if (fruit) {
        if (!accum[fruit]) {
          accum[fruit] = 0;
        }
        accum[fruit] += foodRequirement;
      }
      return accum;
    }, {});

    return { day: i + 1, animalsToFeed: feedCount, totalFood: totalFoodForTheDay };
  });
});

function getWeekDayName(date: Date): Days {
  return daysOfWeek[date.getDay()] as Days;
}

//TODO: Abstract functions into helpers and expand unit tests.
</script>

<template>
  <div class="calendar-container container mx-auto px-4">
    <div class="header p-4 bg-blue-600 text-white text-center text-xl mb-4">
      Feeding for {{ currentMonth }}
    </div>
    <div class="weekdays grid lg:grid-cols-7 mb-2 text-center font-semibold hidden lg:grid">
      <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <div v-for="n in startingEmptyDays" :key="n" class="border h-40 hidden lg:grid"></div>
      <CalendarCard v-for="entry in entries" :key="entry.day" :day="entry.day" :entry="entry" />
    </div>
  </div>
</template>
