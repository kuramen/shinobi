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
                { number: undefined, label: 'Volume' }
            ]
        }
    }
}
</script>

<style lang="scss">
.section.statistics {
    background-color: $primary-color;
    max-width: 100%;
    padding: 100px 0;
    margin: 0;

    @media (max-width:1080px){
        padding: 100px 20px;
        width: calc(100% - 40px);
    }

    h1, h3 {
        color: $background-color;
    }

    .content, .header {
        max-width: 1080px;
        width: 100%;
        margin: 0 auto;
    }

    .content {
        margin-top: 40px;

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

            @media (max-width:750px){
                h2 {
                    font-size: 60px;
                }

                h3 {
                    font-size: 26px;
                }
            }
        }
    }
    
}
</style>
