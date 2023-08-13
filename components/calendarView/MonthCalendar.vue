<template>
    <div class="calendar-container container mx-auto px-4">
      <div class="header p-4 bg-blue-600 text-white text-center text-xl mb-4">
        {{ currentMonth }}
      </div>
      <div class="weekdays grid lg:grid-cols-7 mb-2 text-center font-semibold hidden lg:grid flex-grow">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div v-for="n in startingEmptyDays" :key="n" class="border h-40 hidden lg:grid"></div>

        <CalendarCard
          v-for="day in daysInMonth"
          :key="day"
          :day="day"
          :entry="entries[day]"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CalendarCard from './CalendarCard.vue'
  import { format, getDaysInMonth, getDay } from 'date-fns'
  
  export default {
    components: {
      CalendarCard
    },
    data() {
      return {
        entries: {
          1: { name: "John Doe", height: 180 },
          5: { name: "Jane Smith", height: 165 },
          // ... other entries
        },
        currentDate: new Date(),
        daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    },
    computed: {
      daysInMonth() {
        return Array.from({ length: getDaysInMonth(this.currentDate) }, (_, i) => i + 1)
      },
      currentMonth() {
        return format(this.currentDate, 'MMMM')
      },
      startingEmptyDays() {
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        return getDay(firstDayOfMonth);
      }
    }
  }
  </script>
  