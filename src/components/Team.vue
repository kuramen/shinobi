<template lang="pug">
.section.team
    .header
        .group
            h2 Behind Shinobi NFT
            h1.title Team
        h3.description It was during a conversation that the Shinobi project was born. The goal was to give a real use to NFTs while participating in the development of the Oasis Network ecosystem. Passionate about manga, the theme was obvious. The Shinobi collection created by a group of friends who had a vision and passion regarding the crypto space and NFt's in general.
    .content
        .team-member(v-for="member in members")
            img.nft(:src="`/images/members/${member.name}.png`")
            .group
                h4.role {{ member.role }}
                h5.name {{ member.name }}
            p.description {{ member.description }}

</template>

<script>
export default {
    name: "Team",
    data() {
        return {
            members: [
                { name: 'Ririan', role: 'Comm', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { name: 'Makushimu', role: 'Artist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { name: 'Kureman', role: 'Dev', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
            ]
        }
    }
}
</script>

<style lang="scss">
.team-member {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    grid-gap: 25px;
    gap: 25px;

    img.nft {
        width: 200px;
        border-radius: 25px;
    }
    
    .description {
        text-align: center;
    }
}
</style>