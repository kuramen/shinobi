<template lang="pug">
.section.team
    .header
        .group
            h2 Behind Shinobi NFT
            h1.title Team
        h3.description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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