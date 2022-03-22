<template lang="pug">
.section.description
  .header
    h1 Become a shinobi
  .content
    img.nft(v-for="nft in nfts" :src="`/images/nfts/${nft}.png`")


</template>

<script>
export default {
    name: "description",
    data() {
      return {
        nfts: [...Array(9).keys()]
      }
    }
}
</script>

<style lang="scss">
    .content {
      img.nft {
        width: 200px;
        border-radius: 25px;
      }
    }

    @media (max-width:750px){
      .section.description .content{
         flex-direction: row;
      }
    }
</style>