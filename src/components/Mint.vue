<template lang="pug">
.mint
    .countdown(v-if="!isPublicSale && !isSoldOut")
        h2.title Public mint in
        p {{ countdown }}
        h2.title Last chance for private mint
    .minter
        p.supply {{ `${collection.soldSupply}/${maxSupply}` }}
        .quantity
            button.less(@click="removeQuantity") -
            p {{ quantity }}
            button.more(@click="addQuantity") +
        p.quantity-prevention {{ quantityPrevention }}
        .sold-out(v-if="isSoldOut") Sold Out
        .price
            .sale.private(:class="{ active: isPrivateSale && !isSoldOut }")
                span.title {{ `${privateSalePrice} $ROSES` }}
                span.description Private sale price
            .sale.public(:class="{ active: isPublicSale && !isSoldOut  }")
                span.title {{ `${publicSalePrice} $ROSES` }}
                span.description Public sale price
        p.price-prevention Excludind gas fees
        h3.error(v-if="error") {{ error }}
        h3.success(v-if="isSuccessfullyMinted")
            | ✅ Transaction has been proceed successfully,
            br
            | your Shinobi is waiting for in your wallet. See it on TofuNFT !
        button.mint(@click="onMint" :disabled="isLoading || isSoldOut" :class="{ loading: isLoading }") 
            span(v-if="!isLoading") {{ mintLabel }}
            svg(v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.072 42.072" )
                path(d="M41.594,16.129H30.725c-0.552,0-0.984,0.458-1.148,0.986c-0.42,1.35-1.68,2.329-3.166,2.329c-1.832,0-3.315-1.484-3.315-3.315c0-1.019,0.46-1.931,1.185-2.539c0.422-0.355,0.713-0.945,0.541-1.47L21.344,1.418c-0.171-0.525-0.447-0.525-0.618,0l-3.445,10.603c-0.171,0.525,0.089,1.179,0.454,1.593c0.512,0.58,0.824,1.34,0.824,2.175c0,1.831-1.484,3.315-3.315,3.315c-1.367,0-2.529-0.83-3.033-2.012c-0.216-0.508-0.696-0.964-1.249-0.964H0.478c-0.553,0.001-0.638,0.264-0.191,0.589l9.294,6.752c0.447,0.324,1.134,0.267,1.632,0.027c0.429-0.207,0.909-0.324,1.418-0.324c1.831,0,3.315,1.484,3.315,3.314c0,1.831-1.484,3.315-3.315,3.315c-0.185,0-0.366-0.019-0.541-0.052c-0.295-0.055-0.663,0.287-0.833,0.812l-3.235,9.956c-0.171,0.525,0.053,0.688,0.5,0.363l8.909-6.473c0.447-0.324,0.569-0.94,0.423-1.435c-0.086-0.292-0.133-0.601-0.133-0.92c0-1.831,1.484-3.315,3.315-3.315s3.315,1.484,3.315,3.315c0,0.319-0.047,0.628-0.133,0.92c-0.146,0.494-0.024,1.11,0.423,1.435l8.909,6.473c0.446,0.324,0.671,0.162,0.5-0.363l-3.209-9.875c-0.171-0.525-0.485-0.902-0.709-0.871c-0.132,0.02-0.267,0.03-0.405,0.03c-1.831,0-3.314-1.484-3.314-3.315c0-1.83,1.483-3.314,3.314-3.314c0.447,0,0.87,0.092,1.258,0.256c0.508,0.215,1.211,0.256,1.658-0.069l9.143-6.642C42.233,16.392,42.146,16.129,41.594,16.129z M21.034,25.204c-1.598,0-2.893-1.295-2.893-2.894c0-1.598,1.295-2.893,2.893-2.893s2.893,1.295,2.893,2.893C23.927,23.909,22.632,25.204,21.034,25.204z")
</template>

<script>
import web3Config from '@/configuration/Web3.json'
import Web3 from "@/mixins/Web3.js"

import { mapState } from 'pinia'
import { useWeb3Store } from '@/stores/web3'

export default {
    app: "Mint",
    mixins: [Web3],
    data() {
        return {
            privateSalePrice: web3Config.sale.private.price,
            publicSalePrice: web3Config.sale.public.price,
            maxSupply: web3Config.collection.maxSupply,
            quantity: 1,
            countdown: "0h 0m 0s",
            isLoading: false
        }
    },
    computed: {
        ...mapState(useWeb3Store, ['user', 'error', 'mintedToken', 'collection']),
        quantityPrevention() {
            return this.isPrivateSale ? 'Max 2 Shinobis per account' : 'No max shinobi per account'
        },
        mintLabel() {
            if (this.isSoldOut) return 'SOLD OUT'
            return this.user ? 'MINT' : 'CONNECT'
        },
    },
    created() {
        if (!this.isPublicMint) {
            const x = setInterval(() => {
                const distance = this.setCountDown()
                if (distance < 0) clearInterval(x)
            }, 1000)
        }
    },
    methods: {
        async onMint() {
            this.isLoading = true
            this.resetError()
            if (!this.user) await this.getWeb3Data()
            else if (!this.isSoldOut) await this.mint(this.quantity)
            this.isLoading = false
        },
        removeQuantity() {
            if (this.quantity > 1) this.quantity -= 1
        },
        addQuantity() {
            if(!(this.isPrivateSale && this.quantity >= 2)) this.quantity += 1
        },
        setCountDown() {
            const now = new Date().getTime();
            const distance = web3Config.sale.public.time - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.countdown = `${hours}h ${minutes}m ${seconds}s`
            return distance
        }
    }
}
</script>

<style lang="scss">

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.mint {
    .countdown {
        text-align: center;

        h2 {
            font-family: "Hartone Softed", sans-serif;
            color: $secondary-color;
            font-size: 50px;
            font-weight: 600;
            margin-bottom: 0px;
        }

        p { 
            font-family: "Roboto", sans-serif;
            color: $primary-color;
            font-size: 40px;
            font-weight: 200;
            margin-top: 0;
            margin-bottom: 50px;
        }
    }

    .minter {
        font-family: "Roboto", sans-serif;
        color: $primary-color;
        font-size: 20px;
        font-weight: 200;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;

        p.supply {
            font-family: "Njnaruto", sans-serif;
            font-weight: 600;
            font-size: 40px;
            margin: 0;
            margin-bottom: 30px;
        }

        .quantity {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 30px;
            border: 1px solid $primary-color;
            width: 200px;
            margin-bottom: 5px;
            border-radius: 15px;

            button {
                background-color: $primary-color;
                color: $background-color;
                width: 30px;
                height: 30px;
                border: 0;
                font-size: 18px;
                cursor: pointer;

                &.more {
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }

                &.less {
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
            }
        }

        .sold-out {
            font-size: 30px;
            font-family: "Njnaruto", sans-serif;
            color: red;
        }
        
        .price {
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;

            .sale {
                display: flex;
                flex-direction: column;
                text-align: left;
                border: 1px solid $primary-color;
                padding: 7px;

                &.public {
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }

                &.private {
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                }
                
                &.active {
                    .title,
                    .description {
                        filter: none;
                    }
                }

                .title,
                .description {
                    filter: blur(2px);
                }

                .title {
                    font-weight: 600;
                    font-size: 19px;
                }

                .description {
                    font-size: 14px;
                    color: $secondary-color;
                }
            }
        }

        p.quantity-prevention,
        p.price-prevention {
            color: $secondary-color;
            font-size: 14px;
            text-align: left;
            margin: 0;
            margin-bottom: 50px;
        }

        h3.error {
            font-size: 15px;
            color: red;
        }

        h3.success {
            font-size: 15px;
            color: green;
            white-space:pre;
        }

        button.mint {
            cursor: pointer;
            background-color: $primary-color;
            color: $background-color;
            width: 200px;
            height: 50px;
            border: 0;
            font-size: 30px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:disabled {
                cursor: not-allowed;
            }

            svg {
                height: 80%;
                animation: rotating 2s linear infinite;
                path {
                    fill: $background-color;
                }
            }
        }
    }
}
</style>