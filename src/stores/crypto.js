import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import Shinobi from '@/contracts/Shinobi.sol/ShinobiERC721A.json'

const config = {
  "CONTRACT_ADDRESS": "0x93C131dbaCedA064Fbd59DC18C9358bc22A075bf",
  "SCAN_LINK": "https://explorer.emerald.oasis.dev/token/0x93C131dbaCedA064Fbd59DC18C9358bc22A075bf",
  "NETWORK": {
    "NAME": "Oasis Emerald",
    "SYMBOL": "Rose",
    "ID": 42262
  },
  "NFT_NAME": "Shinobi NFT",
  "SYMBOL": "Dope Wolf",
  "MAX_SUPPLY": 1111,
  "WEI_COST": 299000000000000000000,
  "DISPLAY_COST": 10,
  "GAS_LIMIT": 285000, 
  "MARKETPLACE": "Tofunft",
  "MARKETPLACE_LINK": "https://tofunft.com/discover/items?contracts=13280&network=42262",
  "SHOW_BACKGROUND": true
}

export const useCryptoStore = defineStore('user', () => {
  let account = null
      guestPosts = []
      loading = false
      guestPostsCount = 0

  const connect = () => {
        return async dispatch => {
          dispatch(connectRequest());
          const abiResponse = Shinobi.abi
          const abi = await abiResponse.json();
          const configResponse = await fetch("/config/config.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          const CONFIG = await configResponse.json();
          const {
            ethereum
          } = window;
          const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
      
          if (metamaskIsInstalled) {
            web3_eth_contract__WEBPACK_IMPORTED_MODULE_0___default.a.setProvider(ethereum);
            let web3 = new web3__WEBPACK_IMPORTED_MODULE_1___default.a(ethereum);
      
            try {
              const accounts = await ethereum.request({
                method: "eth_requestAccounts"
              });
              const networkId = await ethereum.request({
                method: "net_version"
              });
      
              if (networkId == CONFIG.NETWORK.ID) {
                const SmartContractObj = new web3_eth_contract__WEBPACK_IMPORTED_MODULE_0___default.a(abi, CONFIG.CONTRACT_ADDRESS);
                dispatch(connectSuccess({
                  account: accounts[0],
                  smartContract: SmartContractObj,
                  web3: web3
                })); // Add listeners start
      
                ethereum.on("accountsChanged", accounts => {
                  dispatch(updateAccount(accounts[0]));
                });
                ethereum.on("chainChanged", () => {
                  window.location.reload();
                }); // Add listeners end
              } else {
                dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
              }
            } catch (err) {
              dispatch(connectFailed("Something went wrong."));
            }
          } else {
            dispatch(connectFailed("Install Metamask."));
          }
        };
      };

  async function wave(messageInput) {
    console.log('setting loader')
    setLoader(true)
    try {
      console.log('got', messageInput)
      const { ethereum } = window
      if (ethereum) {
      // create provider object from ethers library, using ethereum object injected by metamask
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, Shinobi.abi, signer)
        wavePortalContract.on('PrizeMoneySent', (receiver, amount) => {
          console.log('prize won! %s received ', receiver, amount.toNumber())
        })

        const overrides = {
          value: ethers.utils.parseEther('.05'), // sending one ether
          gasLimit: 200000, // optional
        }

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave(messageInput, overrides)
        console.log('Mining...', waveTxn.hash)
        await waveTxn.wait()
        console.log('Mined -- ', waveTxn.hash)

        const count = (await wavePortalContract.totalWaveCount()).toNumber()
        console.log('count', count)
        messageInput = ''
        setLoader(false)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function getAllWaves() {
    try {
    // setLoading(true);
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, Shinobi.abi, signer)

        const waves = await wavePortalContract.getAllWaves()

        /*
             * We only need address, timestamp, and message in our UI so let's
             * pick those out
             */
        const wavesCleaned = []
        waves.forEach((wave) => {
          const waveTime = new Date(wave.timestamp * 1000)
          // const waveTimeFormatted = moment(waveTime).format('llll')
          // DateTime.fromFormat(waveTime, 'MM-dd-yyyy').toJSDate();
          const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime)

          wavesCleaned.push({
            address: wave.waver,
            timestamp: waveTimeFormatted,
            message: wave.message,
          })
        })

        // setAllWaves(wavesCleaned)
        guestPosts = wavesCleaned

        wavePortalContract.on('NewWave', (from, message, timestamp) => {
          console.log('NewWave', from, timestamp, message)
          const waveTime = new Date(timestamp * 1000)
          // const waveTimeFormatted = moment(waveTime).format('llll')
          const waveTimeFormatted = new Intl.DateTimeFormat('en-US').format(waveTime)
          guestPosts = [...guestPosts, {
            address: from,
            timestamp: waveTimeFormatted,
            message,

          }]
        })
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    // setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function getWaveCount() {
    try {
      const { ethereum } = window
      if (ethereum) {
      // create provider object from ethers library, using ethereum object injected by metamask
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const wavePortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
        const count = (await wavePortalContract.totalWaveCount())
        console.log('Retrieved total wave count...', count)
        guestPostsCount = count
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    // setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
      }
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected: ', myAccounts[0])
      account = myAccounts[0]
      await getWaveCount()
      await getAllWaves()
      await getBalance()
    }
    catch (error) {
      console.log(error)
    }
  }

  function setLoader(value) {
    console.log('setloader', value)
    loading = value
  }

  return {
    setLoader,
    loading,
    wave,
    connectWallet,
    account,
    guestPosts,
    guestPostsCount,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))