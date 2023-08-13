<template>
  <header class="bg-green-900 shadow-md text-white">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <nuxt-link href="/">
        <img class="h-10 w-auto" src="~/assets/images/logo.png" alt="Logo" />
      </nuxt-link>
      <nav >
        <ul class="hidden md:flex space-x-4">
          <li><nuxt-link class="hover:text-green-300 transition" href="/">Home</nuxt-link></li>
          <li><nuxt-link class="hover:text-green-300 transition" href="/calendar">Calendar</nuxt-link></li>
          <li><nuxt-link class="hover:text-green-300 transition" href="/about">About</nuxt-link></li>
        </ul>
      </nav>
      <!-- Mobile Menu Icon -->
      <div class="md:hidden flex items-center">
        <button @click="isMenuOpen = !isMenuOpen">
          <!-- Hamburger Icon -->
          <div class="flex flex-col space-y-1">
            <div class="w-6 h-1 bg-white"></div>
            <div class="w-6 h-1 bg-white"></div>
            <div class="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </div>
      <!-- Mobile Menu Dropdown -->
      <div v-if="isMenuOpen" class="absolute top-14 left-0 w-full bg-green-600 z-10 md:hidden">
        <ul class="space-y-2 py-2">
          <li><nuxt-link class="block px-4 py-2 hover:text-green-300 transition" href="/">Home</nuxt-link></li>
          <li><nuxt-link class="block px-4 py-2 hover:text-green-300 transition" href="/calendar">Calendar</nuxt-link></li>
          <li><nuxt-link class="block px-4 py-2 hover:text-green-300 transition" href="/about">About</nuxt-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  name: "Header",
}
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* ensures the header spans the full width of the viewport */
  z-index: 1000; /* a high z-index to ensure the header stays on top of other content */
}
</style>