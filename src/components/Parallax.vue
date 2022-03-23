<template lang="pug">
.hero
    .layer(
        v-if="hasParallax"
        v-for="(layer, index) in layers"
        :class="{ parallax: hasParallax }"
        :id="`layer-${layer.id || index}`"
        :data-speed="layer.dataSpeed || ''"
        style="transform: translate3d(0px, 0px, 0px)"
    )
    .layer.static(v-else)
</template>

<script>
export default {
    name: 'Parallax',
    data() {
        return {
            hasParallax: false,
            layers: [
                { hasParallax: true , dataSpeed: 2 },
                { hasParallax: true , dataSpeed: 5 },
                { hasParallax: true , dataSpeed: 11 },
                { hasParallax: true , dataSpeed: 16 },
                { hasParallax: true , dataSpeed: 26 },
                { hasParallax: true , dataSpeed: 36 },
                { hasParallax: true , dataSpeed: 49 },
                { hasParallax: false, id: 'scrim' },
                { hasParallax: true , dataSpeed: 69 },
                { hasParallax: false , dataSpeed: 100 }
            ]
        }
    },
    created() {
        window.addEventListener("scroll", this.onScroll)
    },
    methods: {
        onScroll() {
            const layers = document.getElementsByClassName("parallax");
            for (const layer of layers) {
                const speed = layer.getAttribute('data-speed')
                const yPos = -(this.pageYOffset * speed / 100)
                layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
            }
        }
    }
}
</script>

<style lang="scss">
.hero {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100vh;

    .layer {
        display: block;
        width: 100%;
        height: 100vh;

        &.parallax {
            position: fixed;
            background-attachment:fixed;
        }

        &#layer-0 {
            background-image: url('/images/parallax/0.png');
            background-color: $primary-color;
        }

        &#layer-1 {
            background-image: url('/images/parallax/1.png');
        }

        &#layer-2 {
            background-image: url('/images/parallax/2.png');
        }

        &#layer-3 {
            background-image: url('/images/parallax/3.png');
        }

        &#layer-4 {
            background-image: url('/images/parallax/4.png');
        }

        &#layer-5 {
            background-image: url('/images/parallax/5.png');
        }

        &#layer-6 {
            background-image: url('/images/parallax/6.png');
        }

        &#layer-7 {
            background-image: url('/images/parallax/7.png');
        }

        &#layer-8 {
            background-image: url('/images/parallax/8.png');
        }

        &#layer-scrim {
            background-color: $primary-color;
            opacity: 0;
        }

        &.static {
            background: url('/images/parallax/static.jpeg') top right no-repeat;;
        }

        @media only screen and (max-device-width: 450px) {
            /* PARALLAX */
            position: absolute;
            background-size: auto 600px;
        }
    }
}
</style>