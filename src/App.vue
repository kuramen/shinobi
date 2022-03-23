<template lang="pug">
header
  Nav

HomeView

Footer
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import HomeView from '@/views/HomeView.vue'

export default {
  name: "App",
  components: { Nav, HomeView, Footer }
}
</script>

<style lang="scss">

html {
  background-color: $background-color;
  overflow-x: hidden;
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
  z-index: 100;
  width: 100%;
  color: $primary-color;
}
</style>
