<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<template>
  <header class="bg-green-600 shadow-md text-white">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between relative z-20">
      <nuxt-link to="/">
        <img class="h-10 w-auto" src="../../assets/images/logo.png" alt="Logo" />
      </nuxt-link>
      <!-- Desktop Navigation -->
      <nav>
        <ul class="hidden md:flex space-x-4">
          <li>
            <nuxt-link class="hover:text-green-300 transition" to="/" @click.native="closeMenu"
              >Home</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="hover:text-green-300 transition"
              to="/calendar"
              @click.native="closeMenu"
              >Calendar</nuxt-link
            >
          </li>
          <li>
            <nuxt-link class="hover:text-green-300 transition" to="/about" @click.native="closeMenu"
              >About</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <!-- Mobile Menu Icon -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu">
          <!-- Hamburger Icon -->
          <div class="hamburger">
            <span class="bar top" :class="{ open: isMenuOpen }"></span>
            <span class="bar middle" :class="{ open: isMenuOpen }"></span>
            <span class="bar bottom" :class="{ open: isMenuOpen }"></span>
          </div>
        </button>
      </div>
      <!-- Mobile Menu Dropdown -->
      <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
        enter-class="menu-start-position"
      >
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-green-600 z-10 md:hidden flex justify-center items-center"
        >
          <ul class="space-y-4 text-2xl">
            <li>
              <nuxt-link
                class="block px-4 py-2 hover:text-green-300 transition"
                to="/"
                @click.native="closeMenu"
                >Home</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="block px-4 py-2 hover:text-green-300 transition"
                to="/calendar"
                @click.native="closeMenu"
                >Calendar</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="block px-4 py-2 hover:text-green-300 transition"
                to="/about"
                @click.native="closeMenu"
                >About</nuxt-link
              >
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.fixed.inset-0.bg-green-600 {
  background-color: rgba(39, 174, 96, 0.95);
}

.menu-animate-enter-active,
.menu-animate-leave-active {
  transition-duration: 1s;
}
.menu-animate-enter,
.menu-animate-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.menu-start-position {
  top: -4rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
}

.bar {
  height: 2px;
  background-color: white;
  transition: all 0.3s ease-in-out;
}

.bar.top {
  transform-origin: top left;
}

.bar.middle {
  opacity: 1;
  transform: translateX(0);
}

.bar.bottom {
  transform-origin: bottom left;
}

.bar.open.top {
  transform: rotate(45deg);
}

.bar.open.middle {
  opacity: 0;
  transform: translateX(-16px);
}

.bar.open.bottom {
  transform: rotate(-45deg);
}
</style>
