<template>
  <div class="site-wrapper flex flex-col min-h-screen">
    <header>
      <Header />
    </header>
    <main class="site-content flex-grow">
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from '~/components/header/Header';
import 'animate.css';

export default {
  components: {
    Header,
  },
};
</script>
