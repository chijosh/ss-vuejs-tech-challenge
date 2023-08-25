<script lang="ts" setup>
import type { Animal } from '@/types';
import Swal from 'sweetalert2';
import { computed } from 'vue';
import type { PropType } from 'vue';

import { calculateAgeInYears, calculateFoodRequirement } from '../../composables/helpers';

const props = defineProps({
  animals: {
    type: Array as PropType<Array<Animal>>,
    required: true,
  },
});

const animalsSortedByName = computed(() =>
  props.animals.slice().sort((animalA, animalB) => {
    if (animalA.name.toLowerCase() < animalB.name.toLowerCase()) return -1;
    if (animalA.name.toLowerCase() > animalB.name.toLowerCase()) return 1;
    return 0;
  }),
);

const openModal = (index: string) => {
  const animal = props.animals.find((animal) => animal.id === index);
  if (!animal) {
    console.error('Animal not found!');
    return;
  }

  const getContainer = (animalTag: string, animalInfo: string | Number, option = '') => {
    if (!animalInfo) return '<p>No info available</p>';
    return `
      <article class="flex justify-between mb-2">
        <h3 class="font-bold">${animalTag + ': '}</h3> 
        <p class="capitalize">${' ' + animalInfo}${option ? option : ''}</p>
      </article>
      `;
  };

  const modalData = `
    <div class="w-full flex flex-col md:flex-row justify-between">
      <div class="w-full md:w-2/5 mb-4 md:mb-0 pr-2">
        ${getContainer('Name', animal.name)}
        ${getContainer('Specie', animal.species)}
        ${getContainer('Gender', animal.gender)}
        ${getContainer('Age', calculateAgeInYears(animal.birthdate), 'yr')}
        ${getContainer('Weight', animal.weight, 'kg')}
      </div>
      <div class="w-full md:w-3/5">
        ${getContainer('Height', animal.height, 'Meter')}
        ${getContainer('FavouriteFruit', animal.favouriteFruit)}
        ${getContainer('FoodRequired', calculateFoodRequirement(animal), 'kg')}
      </div>
    </div>
    `;
  Swal.fire({
    title: 'Animal Details',
    html: modalData,
    confirmButtonText: 'Close',
  });
};
</script>

<template>
  <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-lg my-5 text-gray-800">
    <thead class="bg-gradient-to-r from-gray-600 to-gray-900 text-white">
      <tr>
        <th class="py-2 px-3 md:px-6 text-center">Index</th>
        <th class="hidden md:table-cell py-2 px-3 md:px-6 text-center">Species</th>
        <th class="py-2 px-3 md:px-6 text-center">Name</th>
        <th class="hidden md:table-cell py-2 px-3 md:px-6 text-center">Gender</th>
        <th class="hidden md:table-cell py-2 px-3 md:px-6 text-center">Age (yrs)</th>
        <th class="hidden md:table-cell py-2 px-3 md:px-6 text-center">Weight (kg)</th>
        <th class="py-2 px-3 md:px-6 text-center">Details</th>
        <th class="py-2 px-3 md:px-6 text-center">Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(
          { id, species, gender, name, birthdate, weight }, animalIndex
        ) in animalsSortedByName"
        :key="id"
        class="bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition duration-300"
      >
        <td class="py-2 px-3 md:px-6 text-center">{{ animalIndex + 1 }}</td>
        <td class="hidden md:table-cell py-2 px-3 md:px-6 text-center">
          {{ species }}
        </td>
        <td class="py-2 px-3 md:px-6 text-center">{{ name }}</td>
        <td class="hidden md:table-cell py-2 px-3 md:px-6 text-center">
          {{ gender }}
        </td>
        <td class="hidden md:table-cell py-2 px-3 md:px-6 text-center">
          {{ calculateAgeInYears(birthdate) }}
        </td>
        <td class="hidden md:table-cell py-2 px-3 md:px-6 text-center">
          {{ weight }}
        </td>
        <td class="py-2 px-3 md:px-6 text-center">
          <button
            @click="openModal(id)"
            class="text-gray-700 hover:text-gray-900 transition duration-300 focus:outline-none"
          >
            View more
            <font-awesome-icon :icon="['fas', 'eye']" size="lg" style="color: #0f51c2" />
          </button>
        </td>
        <td class="py-2 px-3 md:px-6 text-center">
          <nuxt-link :to="`/animal/${id}`">
            <button>
              <font-awesome-icon
                :icon="['fas', 'pen-to-square']"
                size="lg"
                style="color: #0f51c2"
              />
            </button>
          </nuxt-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  @apply text-left;
}

td {
  @apply w-40;
}

tr {
  @apply border-b-2;
}

/* Add custom responsive styles */
@media screen and (max-width: 640px) {
  .table-responsive tbody tr {
    display: block;
    margin-bottom: 0.625em;
  }
  .table-responsive thead {
    display: none; /* Hide table headers (but not display: none;, for accessibility) */
  }
  .table-responsive tbody tr:before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  .table-responsive tbody tr td:last-child {
    margin-bottom: 0;
  }
}
</style>
