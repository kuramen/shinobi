

<template lang="pug">
main
  Description
  Team
  Roadmap
</template>

<script>
import Description from "@/components/Description.vue";
import Team from "@/components/Team.vue";
import Roadmap from "@/components/Roadmap.vue";

export default {
  name: "HomeView",
  components: { Description, Roadmap, Team }
}
</script>

<style lang="scss">
main {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;

  .section {
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    padding: 0 20px;
    margin: 100px auto 0 auto;

    h1, h2, h3, h4, h5, p {
      margin: 0;
      padding: 0;
      border: 0;
      text-decoration: none;
      vertical-align: baseline;
      font-family: "Roboto", sans-serif;
    }

    h1 {
      font-family: "Hartone Softed", sans-serif;
      font-size: 120px;
      font-weight: 100;
      color: $primary-color;
    }

    h2 {
      font-size: 18px;
      font-weight: 400;
      color: $secondary-color;
    }

    h3, p {
      font-size: 14px;
    }

    h3 {
      color: $primary-color;
    }

    h4 {
      color: $secondary-color;
    }

    h5 {
      font-family: "Njnaruto", sans-serif;
      font-size: 30px;
      color: $primary-color;
    }

    p {
      color: $tertiary-color;
    }

    @media (max-width:750px){
      h1 {
        font-size: 55px;
      }

      h2 {
        font-size: 16px;
      }
    }

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      grid-gap: 30px;
      gap: 30px;

      .group {
        display: flex;
        flex-direction: column;
      }

      h3 {
        max-width: 524px;
      }

      @media (max-width:800px){
        flex-direction: column;
        text-align: center;
      }
    }

    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 75px;
      grid-gap: 50px;
      gap: 50px;

      @media (max-width:750px){
        flex-direction: column;
      }
    }
    

  }
}
</style>
