<script setup lang="ts">
import { ref } from 'vue';
import type { WeeklyChecks } from '@/types'
import AnimalInfoRender from '../animalInfoRender/AnimalInfoRender.vue';

const animals = useAnimals()
const routeObject = useRoute()
const param = routeObject.params

const animal = animals.value.find(animal => animal.id === param._id);
 if (!animal) {
    console.error('Animal not found!');
  } 

const weeklyChecks: WeeklyChecks = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false
};



</script>

<template>
  <div class="container mx-auto mt-10 px-4 lg:px-0">
    <div v-if="animal" class="bg-white rounded shadow-lg p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-900">{{ animal.name }}</h1>


      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img v-if="animal.image" :src="`/_nuxt/assets/${animal?.image}`" alt="Animal Image" class="w-full h-64 object-cover rounded mb-6">
        </div>
        <div>
 
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Details</h2>
          <AnimalInfoRender :animalTag="'Specie'" :animalSpecie="animal.species" />
          <AnimalInfoRender :animalTag="'Gender'" :animalSpecie="animal.gender" />
          <AnimalInfoRender :animalTag="'Height'" :animalSpecie="animal.height.toString()" :options="'meter'"/>
          <AnimalInfoRender :animalTag="'Age'" :animalSpecie="calculateAgeInYears(animal.birthdate).toString()" :options="'yr'"/>
          <AnimalInfoRender :animalTag="'Favourite fruit'" :animalSpecie="animal.favouriteFruit" />
          <AnimalInfoRender :animalTag="'Weight'" :animalSpecie="animal.weight.toString()" :options="'kg'"/>
        </div>

      </div>

      <div v-if="animal.additionalInfo">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Additional Information</h2>
        <p v-for="(value, key) in animal.additionalInfo" :key="key" class="mb-2">
          <span class="font-medium text-gray-700">{{ key }}:</span> {{ value }}
        </p>
      </div>

      <!-- Weekly Checks Section -->
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Weekly Checks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(isChecked, day) in weeklyChecks" :key="day">
          <label class="flex items-center space-x-3">
            <input v-model="weeklyChecks[day]" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600">
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
