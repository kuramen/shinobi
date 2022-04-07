<template lang="pug">
.section.description
  .header
    .group
      h1 Become a shinobi
      .socials
          SocialIcon(v-for="social in socials" :social-network="social.name")
  .content#nfts-description
    img.nft(v-for="nft in nfts" :src="`/images/nfts/${nft}.png`")


</template>

<script>
import SocialIcon from "@/components/icons/Social.vue";

export default {
    name: "description",
    components: { SocialIcon },
    data() {
      return {
        socials: [
            { name: 'twitter' },
            { name: 'medium' },
            { name: 'discord' }
        ],
        nfts: [...Array(20).keys()]
      }
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
  min-height: 500px;

  .header {
    .socials {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        gap: 50px;
        grid-gap: 50px;

        @media (max-width:750px){
          gap: 20px;
          grid-gap: 20px;
          margin-top: 20px;
        }

        a {
            width: 50px;

            @media (max-width:750px){
              width: 40px;
            }

            svg.logo path {
              fill: $secondary-color;
            }
        }

    }
  }

  .content {
    position: absolute;
    left: -30%;
    top: 30%;
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