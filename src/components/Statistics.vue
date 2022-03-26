<template lang="pug">
.section.statistics
    .header
        .group
            h2 Shinobi NFT in few
            h1.title Numbers
    .content
        .statistics-item(v-for="stat in stats")
            h2.number {{stat.number || '-'}}
            h3.label {{stat.label}}
        
</template>


<script>
export default {
    name: "Statistics",
    data() {
        return {
            stats: [
                { number: undefined, label: 'Holders' },
                { number: undefined, label: 'Staked token' },
                { number: 100, label: 'Volume' }
            ]
        }
    }
}
</script>

<style lang="scss">
.section.statistics {
    background-color: $primary-color;
    padding: 100px 5vw;
    width: calc(100% - 10vw);
    max-width: 100%;
    margin: 0;

    h1, h3 {
        color: $background-color;
    }

    .statistics-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;

        h2 {
            font-size: 96px;
            font-weight: 600;
        }

        h3 {
            font-size: 40px;
            font-weight: 400;
        }
    }

    .content {
        margin-top: 40px;
    }
    
}
</style>
