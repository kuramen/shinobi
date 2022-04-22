import Shinobi from '@/configuration/ShinobiERC721.json'
import web3Config from '@/configuration/Web3.json'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { mapState, mapActions } from 'pinia'
import { useWeb3Store } from '@/stores/web3'

export default {
    data() {
        return {
            isSuccessfullyMinted: false
        }  
    },
    computed: {
        ...mapState(useWeb3Store, ['getProof', 'collection']),
        isPrivateSale() {
            const {
                private: { time: privateTime },
                public: { time: publicTime }
            } = web3Config.sale
            return new Date() >= new Date(privateTime) && new Date() < new Date(publicTime)
        },
        isPublicSale() {
            const { public: { time: publicTime } } = web3Config.sale
            return new Date() >= new Date(publicTime)
        },
        isSoldOut() {
            return this.collection.soldSupply >= web3Config.collection.maxSupply
        }
    },
    methods: {
        ...mapActions(useWeb3Store, ['setWeb3Data', 'resetWeb3Data', 'setError', 'resetError']),
        async checkConnection() {
            // Get ethereum provider
            const provider = await detectEthereumProvider();
            if(!provider) return Promise.reject('Please install MetaMask!')
            if(provider !== window.ethereum) return Promise.reject('Do you have multiple wallets installed?')

            // Check provider network
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            const networkConfig = web3Config.networks['testnet']
            if (chainId !== networkConfig.chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: ethers.utils.hexlify(networkConfig.chainId) }]
                    })
                } catch (error) {
                    if (error.code === 4902) {
                        await window.ethereum.request({
                          method: 'wallet_addEthereumChain',
                          params: [networkConfig]
                        })
                    } else {
                        return Promise.reject(error)
                    }
                }
            }

            // Get account
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'})
            } catch (error) {
                if (error.code === 4001) {
                    return Promise.reject('Please connect to MetaMask.')
                }
                return Promise.reject(error)
            }
        
            return Promise.resolve({
                provider,
                ethersProvider: new ethers.providers.Web3Provider(provider)
            })
        },
        async getWeb3Data() {
            try {
                const { provider, ethersProvider } = await this.checkConnection()
                const [account] = await provider.request({method: 'eth_requestAccounts'})
                const signer = ethersProvider.getSigner()
                const contract = new ethers.Contract(web3Config.contractAdress, Shinobi.abi, signer)
                await this.setWeb3Data({ account, contract })
            } catch (error) {
                console.error(error)
                this.setError(error.message)
            }
        },
        async mint(quantity) {
            this.isSuccessfullyMinted = false
            if (this.isSoldOut) return
            const { provider, ethersProvider } = await this.checkConnection()
            const [account] = await provider.request({method: 'eth_requestAccounts'})
            const signer = ethersProvider.getSigner();
            const contract = new ethers.Contract(web3Config.contractAdress, Shinobi.abi, signer)
            try {        
                let transaction
                
                if (this.isPrivateSale) {
                    const cost = await contract.pricePresale()
                    const overrides = { from: account, value: cost }
                    const proof = this.getProof(account)
                    transaction = await contract.privateSaleMint(account, quantity, proof, overrides)
                } else {
                    const priceSale = await contract.priceSale()
                    const overrides = { from: account, value: priceSale }
                    transaction = await contract.publicSaleMint(quantity, overrides)
                }
                
                try {
                    await transaction.wait()
                } catch (error) {
                    try {
                        const utf8Reason = await ethersProvider.call(transaction, transaction.blockNumber)
                        const errorMessage = ethers.utils.toUtf8String('0x' + utf8Reason.substr(138))
                        this.setError(errorMessage)
                        return
                    } catch(error) {
                        this.setError(error.message)
                    }
                }
                await this.getWeb3Data()
                this.isSuccessfullyMinted = true
            }
            catch(error) {
                this.setError(error.message)
            }
        }
    }
}