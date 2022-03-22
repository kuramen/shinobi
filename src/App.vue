<template lang="pug">
header
  Nav

RouterView

Footer
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "App",
  components: { Nav, Footer }
}
</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
}

#app {
  margin: 0;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: $background-color;
}

header {
  background-color: $background-color;
  z-index: 100;
  width: 100%;
  color: $primary-color;
}
</style>
