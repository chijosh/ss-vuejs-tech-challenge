<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<template>
  <footer class="bg-green-600 text-white py-1 mt-4">
    <div class="container mx-auto px-4 flex flex-wrap justify-between items-center">
      <!-- Logo and Site Name -->
      <div class="flex items-center space-x-2">
        <img class="h-10 w-auto" src="../../assets/images/logo.png" alt="Logo" />
        <span class="text-xl font-semibold">Cologne Zoo</span>
      </div>
      <!-- Copyright and Date -->
      <div class="text-sm">&copy; {{ currentYear }} Cologne Zoo. All Rights Reserved.</div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  flex-shrink: 0;
}
</style>
