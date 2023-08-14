<script setup lang="ts">
import type { WeeklyChecks, Days } from '@/types';
import AnimalInfoRender from '../animalInfoRender/AnimalInfoRender.vue';
import { useAsset } from '../../composables/handleImage';
import Swal from 'sweetalert2';

const animals = useAnimals();
const routeObject = useRoute();
const param = routeObject.params;

const animal = animals.value.find((animal) => animal.id === param._animalsId);
if (!animal) {
  console.error('Animal not found!');
}

const weeklyChecks: WeeklyChecks = animal?.weeklyChecks || {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false,
};

const handleCheckboxChange = (day: Days) => {
  console.log(`Checkbox for ${day} was changed to ${weeklyChecks[day as keyof WeeklyChecks]}`);

  const animalIndex = animals.value.findIndex((a) => a.id === animal?.id);

  if (animalIndex !== -1) {
    animals.value[animalIndex].weeklyChecks = {
      ...weeklyChecks,
      [day]: weeklyChecks[day as keyof WeeklyChecks],
    };
  }
  Swal.fire({
    position: 'bottom-start',
    text: 'The schedule has been saved',
    showConfirmButton: false,
    timer: 3500,
    backdrop: false,
    showClass: {
      popup: 'animate__animated animate__slideInLeft',
    },
    hideClass: {
      popup: 'animate__animated animate__slideOutLeft',
    },
  });
};
</script>

<template>
  <div class="container mx-auto mt-10 px-4 lg:px-0">
    <div v-if="animal" class="bg-white rounded shadow-lg p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-900">{{ animal.name }}</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            v-if="animal.image"
            :src="useAsset(animal.species + '.jpg')"
            alt="Animal Image"
            class="w-full h-64 object-cover rounded mb-6"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Details</h2>
          <AnimalInfoRender :animalTag="'Specie'" :animalSpecie="animal.species" />
          <AnimalInfoRender :animalTag="'Gender'" :animalSpecie="animal.gender" />
          <AnimalInfoRender
            :animalTag="'Height'"
            :animalSpecie="animal.height.toString()"
            :options="'meter'"
          />
          <AnimalInfoRender
            :animalTag="'Age'"
            :animalSpecie="calculateAgeInYears(animal.birthdate).toString()"
            :options="'yr'"
          />
          <AnimalInfoRender :animalTag="'Favourite fruit'" :animalSpecie="animal.favouriteFruit" />
          <AnimalInfoRender
            :animalTag="'Weight'"
            :animalSpecie="animal.weight.toString()"
            :options="'kg'"
          />
        </div>
      </div>

      <!-- Weekly Checks Section -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Weekly Feeding</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(isChecked, day) in animal.weeklyChecks" :key="day">
            <label class="flex items-center space-x-3">
              <input
                v-model="weeklyChecks[day]"
                @change="handleCheckboxChange(day)"
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span class="text-gray-700">{{ day }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">No animal data available</p>
    </div>
  </div>
</template>
