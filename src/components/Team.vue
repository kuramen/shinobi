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
                { name: 'Ririan', role: 'Comm', description: 'Ririan has vast experience in business and investment management, being an established figure in the crypto industry. He currently informs over 180,000+ users about crypto world. He has been interested in Crypto since 2015.' },
                { name: 'Makushimu', role: 'Artist', description: "Makushimu is a full-time, freelance artist with an extensive background spanning across several fields including advertisements, board games and films. Shinobi is Makushimu's first NFT project but certainly not the last." },
                { name: 'Kureman', role: 'Dev', description: 'Kureman is a full-stack web developer, specializing in JavaScript. He previously worked in fintech company to secure payments but turned to crypto since 2019.' }
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