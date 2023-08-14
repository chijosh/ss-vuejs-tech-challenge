<script lang="ts"></script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CalendarCard from './CalendarCard.vue';
import { format, getDaysInMonth, getDay } from 'date-fns';
import { Days } from '../../types';

const currentDate = ref(new Date());
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const animals = ref(useAnimals());

const daysInMonth = computed(() => {
  return Array.from({ length: getDaysInMonth(currentDate.value) }, (_, i) => i + 1);
});

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

const entries = computed(() => {
  return Array.from({ length: getDaysInMonth(currentDate.value) }, (_, i) => {
    const current = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i + 1);
    const dayName = getWeekDayName(current);

    const feedCount = animals.value.filter(
      (animal) => animal.weeklyChecks && animal.weeklyChecks[dayName],
    ).length;

    return { day: i + 1, animalsToFeed: feedCount };
  });
});

function getWeekDayName(date: Date): Days {
  return daysOfWeek[date.getDay()] as Days;
}
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

      <CalendarCard
        v-for="day in daysInMonth"
        :key="day"
        :day="day"
        :animalsToFeed="entries[day]?.animalsToFeed || 0"
      />
    </div>
  </div>
</template>
