<template lang="pug">
nav
    .logo 
        img(src="/images/logo.svg" alt="Shinobi NFT")
    ul.desktop-nav(:class="`${false ? 'mobile' : 'desktop'}-nav`")
        li.nav-link(v-if="false")
            .link(v-for="item in navigation" :to="{ name: item.name }") {{ item.name }}
        Metamask
    .mobile-icon(v-if="false" @click="toggleMobileNav" :class="{ 'active': isMobileNavOpen }")
        span
        span
        span
</template>

<script>
import Mobile from "@/mixins/Mobile.js";
import Metamask from "@/components/icons/Metamask.vue";

export default {
    app: "Nav",
    components: { Metamask },
    mixins: [ Mobile ],
    data() {
        return {
            isMobileNavOpen: false,
            navigation: []
        };
    },
    watch: {
        isMobile: "resetMobileNav"
    },
    methods: {
        toggleMobileNav() {
            this.isMobileNavOpen = !this.isMobileNavOpen;
        },
        resetMobileNav() {
            this.isMobileNavOpen = false;
        }
    }
}
</script>

<style lang="scss">
    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: 1080px;
        margin: 0 auto;
        padding: 20px;
        border-top: 2px $background-color;

        ul, .link {
            font-weight: 500;
            color: $primary-color;
            list-style: none;
            text-decoration: none;
        }

        .nav-link {
            text-transform: uppercase;
            font-family: "Roboto", sans-serif;
            padding: 0;
            margin-left: 0;

            .link {
                font-size: 14px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;

                &:hover {
                    color: $secondary-color;
                    border-color: $secondary-color;
                }
            }
        }

        .logo {
            display: flex;
            align-items: center;

            img {
                width: 150px;
            }
        }

        .desktop-nav{
            display: flex;
            align-items: center;
            padding: 0;
        }

        .mobile-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            margin: 0 auto;
            right: 24px;
            cursor: pointer;

            span {
                display: block;
                width: 33px;
                height: 4px;
                position: relative;
                
                background: $primary-color;
                border-radius: 3px;
                
                z-index: 1;
                
                transform-origin: 4px 0px;
                
                transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            opacity 0.55s ease;

                &:nth-child(1) {
                    margin-bottom: 5px;
                }

                &:nth-child(3) {
                    transform-origin: 0% 100%;
                    margin-top: 5px;
                }
            }

            &.active {
                span {
                    opacity: 1;
                    transform: rotate(45deg) translate(-2px, -1px);
                    background: $primary-color;

                    &:nth-child(2) {
                        opacity: 0;
                        transform: rotate(0deg) scale(0.2, 0.2);
                    }

                    &:nth-child(3) {
                        transform: rotate(-45deg) translate(0, -1px);
                    }
                }
            }
        }

        .mobile-nav{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            width: 100%;
            max-width: 250px;
            height: 100%;
            background-color: $background-color;
            margin: 0;
            padding: 0;
            top: 109px;
            left: 0;
            transition: 0.5s ease all;
            transform: translateX(-300px);

            li {
                margin-left: 0;
                margin-top: 50px;

                &.nav-social {
                    width: 80%;
                    justify-content: space-around;
                }
            }


            &.active {
                transform: translateX(0);
            }
        }
    }

    
</style>
