<script lang="ts">
import FeedingOverview from '../../components/feedingOverview/DailyFeedingOverview.vue';

export default {
  name: '_dayOfMonth',
  components: {
    FeedingOverview,
  },
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="mx-4 md:mx-12 lg:mx-24">
    <h1 class="text-3xl md:text-4xl lg:text-5xl mt-4 mb-2 font-bold">Feeding Schedule</h1>
  </div>
  <FeedingOverview />
</template>
