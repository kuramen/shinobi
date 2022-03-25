<template lang="pug">
.section.description
  .header
    h1 Become a shinobi
  .content#nfts-description
    img.nft(v-for="nft in nfts" :src="`/images/nfts/${nft}.png`")


</template>

<script>
export default {
    name: "description",
    data() {
      return {
        nfts: [...Array(20).keys()]
      }
    },
    mounted(){
      //document.getElementById('nfts-description').style.transform = "translateX(-70%)"
    }
}
</script>

<style lang="scss">
@keyframes slideInFromLeft {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(0%);
  }
}

.section.description {
  position: relative;
  min-height: 400px;

  .content {
    position: absolute;
    left: -30%;
    top: 20%;
    animation: 150s linear 0s infinite slideInFromLeft;

    img.nft {
      width: 200px;
      border-radius: 25px;
    }

    @media (max-width:750px){
         flex-direction: row;
    }
  }
}
</style>