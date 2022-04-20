import Shinobi from '@/artifacts/contracts/Shinobi.sol/ShinobiERC721A.json'
import web3Config from '@/configuration/Web3.json'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { mapState, mapActions } from 'pinia'
import { useWeb3Store } from '@/stores/web3'

export default {
    computed: {
        ...mapState(useWeb3Store, ['getProof'])
    },
    async created() {
        await this.getWeb3Data()
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
        
            return Promise.resolve(provider)
        },
        async getWeb3Data() {
            try {
                const provider = await this.checkConnection()
                const [account] = await provider.request({method: 'eth_requestAccounts'})
                //const contract = new ethers.Contract(web3Config.contractAdress, Shinobi.abi, provider)
                await this.setWeb3Data({ account })
            } catch (error) {
                console.error(error)
                this.setError(error.message)
            }
        },
        async mint(quantity) {
            const provider = await this.checkConnection()
            const [account] = await provider.request({method: 'eth_requestAccounts'})
            const signer = provider.getSigner();
            const contract = new ethers.Contract(web3Config.contractAdress, Shinobi.abi, signer)
            try {
                const {
                    private: { time: privateTime },
                    public: { time: publicTime }
                } = web3Config.sale
                const isPrivate = new Date() >= new Date(privateTime) && new Date() < new Date(publicTime)
        
                let transaction
                if (isPrivate) {
                    const proof = this.getProof(account)
                    transaction = await contract.privateSaleMint(account, quantity, proof)
                } else transaction = await contract.publicSaleMint(account, quantity)
               
                await transaction.wait()
                await this.fetchData()
            }
            catch(error) {
                this.setError(error.message)
            }
        }
    }
}