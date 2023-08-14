<script setup lang="ts">
import '../assets/css/tailwind.css';
import { onMounted } from 'vue';

import type { Animal } from '../types';
import Swal from 'sweetalert2';

import FeedingOverview from '../components/feedingOverview/DailyFeedingOverview.vue';  

const stateAnimal = useAnimals()

onMounted(async () => {
  try {
    if(stateAnimal.value.length === 0){
      const animals: Array<Animal> = await $fetch('/api/animals');
      stateAnimal.value.push(...animals)
    }

    showPopupOnce();
  } catch (error) {
    console.error('Failed to fetch animals:', error);
  }
});


const showPopupOnce = () => {
  const popupShownKey = 'welcome_popup_shown';

  try {
    const popupShown = localStorage.getItem(popupShownKey);
    
    if (!popupShown) {
      Swal.fire({
        text: 'Get wrecked cologne zoo!',
        icon: 'success',
        confirmButtonText: `Let's go`,
      });
      localStorage.setItem(popupShownKey, 'true');
    }
  } catch (error) {
    console.error('Failed to access localStorage:', error);
    // TODO: Optionally: Handle this error in a user-friendly way, maybe with another popup or notification.
  }
  
}
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

    <!-- Introducing Feeding Task Overview -->
    <section class="mt-6 mb-4">
      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold">Upcoming Feeding Tasks:</h3>
       <FeedingOverview /> 
    </section>

    <h2 class="text-xl md:text-2xl lg:text-3xl mt-8 mb-4 font-semibold">Our (lovely) Animals:</h2>
    <the-animal-table :animals="stateAnimal" />
  </div>
</template>
