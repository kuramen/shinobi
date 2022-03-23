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
