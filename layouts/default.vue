<script>
import 'animate.css';
import Header from '~/components/header/Header';

export default {
  components: {
    Header,
  },
};
</script>

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
