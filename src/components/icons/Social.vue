<template lang="pug">
a.social(:href="`${configuration.url}/${configuration.account}`" target="_blank")
	svg.logo(xmlns="http://www.w3.org/2000/svg" :viewBox="configuration.viewBox")
		path(:d="configuration.dPath")
</template>

<script>
import SocialNetworks from '@/configuration/SocialNetworks'

export default {
	app: 'SocialIcon',
    props: {
        socialNetwork: { 
            type: String,
            validator(socialNetwork) {
                return Object.keys(SocialNetworks).includes(socialNetwork)
            }
      }
    },
	computed: {
        configuration() {
            return SocialNetworks[this.socialNetwork]
        } 
    }
}
</script>

<style lang="scss">
a.social svg {
    width: 100%;
}
</style>
