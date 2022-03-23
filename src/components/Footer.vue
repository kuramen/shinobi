<template lang="pug">
footer
    p.citation このオレはいずれ火影の名を受け継いで
    p.logo Shinobi NFT
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="scss" scoped>
footer {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	bottom: 0;
	width: 100%;
	height: 200px;

	background-color: $background-color;

	.citation{
		font-family: "Noto Sans JP", sans-serif;
		letter-spacing: 5px;
		font-size: 16px;
		margin-top: 20px;
		color: $primary-color;
	}

	.logo {
		font-family: "Njnaruto", sans-serif;
		color: $secondary-color;
		font-size: 1.5em;
		margin-bottom: 100px;
	}

	@media (max-width:800px){
		.citation {
			font-size: 12px;
		}
	}
}
</style>