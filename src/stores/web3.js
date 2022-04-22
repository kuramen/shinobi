import { defineStore } from 'pinia'
import { MerkleTree } from 'merkletreejs'
import { keccak256 } from '@ethersproject/keccak256'
import whitelist from '@/configuration/Whitelist.json'
import team from '@/configuration/Team.json'


export const useWeb3Store = defineStore('web3', {
  state: () => {
    return { 
      error: '',
      user: '',
      tree: null,
      collection: {
        soldSupply: 0
      }
    }
  },

  getters: {
    getProof: state => address => state.tree.getHexProof(keccak256(address))
  },

  actions: {
    resetError() {
      this.error = ''
    },
    setError(error) {
      this.error = error
    },
    resetWeb3Data() {
      this.user = ''
      this.collection.soldSupply = ''
    },
    setTree() {
      if (!tree) {
        const teamAdresses = team.map(member => member.address)
        const leaves = whitelist.concat(teamAdresses).map(keccak256)
        this.tree = new MerkleTree(leaves, keccak256, { sort: true })
      } 
    },
    async setWeb3Data({ account, soldSupply }) {
      const start = account?.substring(0,5) || ''
      const end = account?.slice(-4) || ''
      if (start && end) this.user = start + '...' + end
      else this.user = ''

      if (soldSupply) this.collection.soldSupply = soldSupply
    }
  }
})