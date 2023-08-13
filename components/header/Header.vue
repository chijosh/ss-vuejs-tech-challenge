<template>
  <header class="bg-green-900 shadow-md text-white">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <a href="/">
        <img class="h-10 w-auto" src="~/assets/images/logo.png" alt="Logo" />
      </a>
      <nav >
        <ul class="hidden md:flex space-x-4">
          <li><a class="hover:text-green-300 transition" href="/">Home</a></li>
          <li><a class="hover:text-green-300 transition" href="/about">About</a></li>
          <li><a class="hover:text-green-300 transition" href="/contact">Contact</a></li>
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
          <li><a class="block px-4 py-2 hover:text-green-300 transition" href="/">Home</a></li>
          <li><a class="block px-4 py-2 hover:text-green-300 transition" href="/about">About</a></li>
          <li><a class="block px-4 py-2 hover:text-green-300 transition" href="/contact">Contact</a></li>
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

</style>