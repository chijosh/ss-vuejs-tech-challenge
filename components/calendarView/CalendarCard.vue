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
      <div v-if="entry" class="text-sm">
        <p><strong>Feed:</strong> {{ entry.animalsToFeed }} animals</p>
        <h3 class="font-semibold">Fruits to Feed:</h3>
        <p v-for="[key, value] in Object.entries(entry.totalFood)" :key="key" class="capitalize">
          <strong>{{ key }}</strong
          >: {{ value.toFixed(2) }} kg
        </p>
      </div>
      <div class="text-gray-600" v-else>No Entry</div>
    </div>
  </nuxt-link>
</template>
