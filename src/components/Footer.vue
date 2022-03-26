<template lang="pug">
footer
    p.citation このオレはいずれ火影の名を受け継いで
    p.logo Shinobi NFT
    .socials
        SocialIcon(v-for="social in socials" :social-network="social.name")
</template>

<script>
import SocialIcon from "@/components/icons/Social.vue"

export default {
    name: "Footer",
	components: { SocialIcon },
	data() {
		return {
			socials: [
                { name: 'twitter' },
                { name: 'discord' }
            ]
		}
	}
}
</script>

<style lang="scss">
footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	bottom: 0;
	width: 100%;
	height: 200px;
	gap: 30px;
	grid-gap: 30px;
	margin-top: 150px;
	margin-bottom: 60px;

	background-color: $background-color;

	.citation{
		font-family: "Noto Sans JP", sans-serif;
		letter-spacing: 5px;
		font-size: 16px;
		margin: 0;
		color: $primary-color;
	}

	.logo {
		font-family: "Njnaruto", sans-serif;
		color: $secondary-color;
		font-size: 1.5em;
		margin: 0;
	}

	.socials {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 30px;
		grid-gap: 30px;

		a.social {
			height: 100%;
			width: 30px;
			display: flex;
			justify-content: center;
			svg.logo path {
				fill: $secondary-color;
			}
		}
	}

	@media (max-width:800px){
		.citation {
			font-size: 12px;
		}
	}
}
</style>