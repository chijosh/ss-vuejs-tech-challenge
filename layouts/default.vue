<template>
  <div>
    <header>
      <Header />
    </header>
    <main>
      <slot />
    </main>
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
  
