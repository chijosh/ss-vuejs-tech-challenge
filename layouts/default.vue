<template>
  <div>
    <header>
      <Header />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "~/components/header/Header";
import 'animate.css';

export default {
  components: {
    Header,
  },
};
</script>
  
