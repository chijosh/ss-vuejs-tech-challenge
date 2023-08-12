<script setup lang="ts">
import './assets/css/tailwind.css';
import type { Animal } from './types';
import Swal from 'sweetalert2';

import FeedingTaskForm from './components/feedingTaskForm/FeedingTaskForm.vue';  
import FeedingOverview from './components/feedingOverview/FeedingOverview.vue';  

const animals: Array<Animal> = await $fetch('/api/animals');
// const feedingTasks: Array<FeedingTask> = await $fetch('/api/feedingTasks'); // Fetching feeding tasks data. Assuming there's an API endpoint for it.

Swal.fire({
  text: 'Get wrecked cologne zoo!',
  icon: 'success',
  confirmButtonText: `Let's go`,
});
</script>

<template>
  <div class="mx-4 md:mx-12 lg:mx-24">
    <h1 class="text-3xl md:text-4xl lg:text-5xl mt-4 mb-2 font-bold">Cologne Zoo</h1>
    <div class="my-4">
      <p class="text-sm md:text-base">
        This is the overview board of the Cologne Zoo. It can be used by
        zookeepers to get an overview of the animals and their relevant health
        data.
      </p>
      <p class="text-sm md:text-base mt-2">
        Please contact the zoo admin at "admin [at] zoo-cologne [dot] de" for
        support with the dashboard. Cyber-Attacks from the Duisburg Zoo have
        become more frequent on the past, so be on the lookout.
      </p>
    </div>
    
    <!-- Introducing Feeding Task Planner -->
    <section class="mt-6 mb-4">
      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold">Plan a Feeding Task:</h3>
      <FeedingTaskForm />
    </section>

    <!-- Introducing Feeding Task Overview -->
    <section class="mt-6 mb-4">
      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold">Upcoming Feeding Tasks:</h3>
      <!-- <FeedingOverview :tasks="feedingTasks" /> -->
    </section>

    <h2 class="text-xl md:text-2xl lg:text-3xl mt-8 mb-4 font-semibold">Our (lovely) Animals:</h2>
    <the-animal-table :animals="animals" />
  </div>
</template>
