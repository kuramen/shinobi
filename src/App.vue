<template lang="pug">
header
  Parallax
  Nav

HomeView

Footer
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import HomeView from '@/views/HomeView.vue'
import Parallax from '@/components/Parallax.vue'

export default {
  name: "App",
  components: { Nav, HomeView, Footer, Parallax }
}
</script>

<style lang="scss">

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: $primary-color;
}

::-webkit-scrollbar-track {
  background: none;
}

html {
  background-color: $background-color;
  overflow: overlay;
  scroll-behavior: smooth;
}

body {
  padding: 0;
  margin: 0;
  position: relative;
  overflow-x: hidden;
}

#app {
  margin: 0;
  position: relative;
  width: 100%;
  min-height: 100vh;
}

header {
  width: 100%;
  color: $primary-color;
}
</style>
