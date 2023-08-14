<script>
export default {
  props: {
    day: {
      type: Number,
      required: true,
    },
    entry: {
      type: Object,
      default: null,
    },
  },
  computed: {
    cardClass() {
      const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'pink', 'indigo'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `border p-4 bg-${randomColor}-200 w-full h-40 flex flex-col items-center justify-between flex-grow`;
    },
  },
};
</script>

<template>
  <nuxt-link :to="`/task/${day}`">
    <div :class="cardClass">
      <div class="text-xl font-bold">{{ day }}</div>
      <div v-if="entry">
        <div>Animals to Feed: {{ entry.animalsToFeed }}</div>
      </div>
      <div class="text-gray-600" v-else>No Entry</div>
    </div>
  </nuxt-link>
</template>
