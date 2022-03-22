<template lang="pug">
a(:href="`${configuration.url}/${configuration.account}`" target="_blank")
	svg(xmlns="http://www.w3.org/2000/svg" :viewBox="configuration.viewBox")
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

<style lang="scss" scoped>
a svg {
    width: 100%;
	path {
		fill: $primary-color
	}
}

a:hover path {
	fill: $secondary-color
}
</style>
