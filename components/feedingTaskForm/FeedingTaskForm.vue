<template>
    <div>
      <h2>Add a Feeding Task</h2>
      <form @submit.prevent="addTask">
        <select v-model="selectedAnimalId">
          <option v-for="animal in animals" :key="animal.id" :value="animal.id">
            {{ animal.name }}
          </option>
        </select>
        <input type="date" v-model="selectedDay" required />
        <input v-model="selectedFruit" placeholder="Fruit" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { FeedingTask } from './types';
  
  const props = defineProps({
    animals: Array,
    addTaskCallback: Function,
  });
  
  const selectedAnimalId = ref('');
  const selectedDay = ref('');
  const selectedFruit = ref('');
  
  const addTask = () => {
    const task: FeedingTask = {
      animalId: selectedAnimalId.value,
      day: new Date(selectedDay.value),
      fruit: selectedFruit.value,
    };
    props.addTaskCallback(task);
  }
  </script>