import { useState, useEffect } from "react";
import { ethers } from 'ethers'
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';


import MintUI from './components/mint-UI.component'
import NotConnected from './components/not-connected.component'
import myEpicNFT from './abi/contracts/MyEpicNFT.sol/MyEpicNFT.json'

import Loading from "./components/loading/loading.component";
// Constants
const TWITTER_HANDLE = 'dv_nmd';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TOTAL_MINT_COUNT = 50;

const showNFT = {
  display: 'flex', 
  height: '40vh',
  flexDirection: 'column',
  width: '30vw',
  border: '1px solid #6ffbff',
  opacity: '0.9',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  marginTop: '10vh',
  marginBottom: '5vh'

  
}



const App = () => {

  const { ethereum } = window
  const contractAddress = '0x53d7254Cab8E5dB57781D052224b7E1868D8d5Fd'


  const provider = new ethers.providers.Web3Provider(ethereum)

  const signer = provider.getSigner()
  const connectedContract = new ethers.Contract(contractAddress, myEpicNFT, signer)
  const [isMintLoading, setIsMintLoading] = useState(false)
  const [isFetchLoading, setIsFetchLoading] = useState(false)

  const initialLogMintEventState = {
    sender: '', 
    tokenID: '', 
    timestamp: ''
  }
  const [logMinted, setLogMinted] = useState(initialLogMintEventState)

  const [currentAccount, setCurrentAccount] = useState('')
  const [txHash, setTxHash] = useState('')
  const [mintCount, setMintCount] = useState('')

  const mintNFT = async () => {
    try {
   
      setIsMintLoading(true)
      console.log('about to approve mint and pay gas')
      const mintTxn = await connectedContract.mintNFT()

      console.log('mining....')
      await mintTxn.wait()
      listenLogMinted()

      if(mintTxn.hash) {
        setIsMintLoading(false)
        setTxHash(mintTxn.hash)
        getTotalMinted()
        console.log('mined', `see tx hash: https://rinkeby.etherscan.io/tx/${mintTxn.hash}`)
      }
      


    } catch(err) {
      if(err) {
        setIsMintLoading(false)
      }
      console.log('error', err)
    }
  }

 

  const getTotalMinted = async () => {
    try {
      setIsFetchLoading(true)
      const totalMinted = await connectedContract.getTotalMints()
      if(totalMinted) {
        setIsFetchLoading(false)
        setMintCount(totalMinted.toNumber())

      }
    } catch(err) {
      console.log(err)
    }
  }

  const listenLogMinted = async() => {

    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const eventInstance = new ethers.Contract(contractAddress, myEpicNFT, provider)
      await eventInstance.on('LogMinted', (sender, tokenID, timestamp) => {
        setLogMinted({
          sender, 
          tokenID, 
          timestamp
        })
    
      })

    } catch(err) {
      console.log(err)
    }

  }



  const checkIfWalletIsConnected = async () => {
    if(!ethereum) {
      alert('you need to install metamask')
    }  

    const accounts = await ethereum.request({ method: 'eth_requestAccounts'})

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      ethereum.on('accountsChanged', () => {
        window.location.reload()
      })
  
      ethereum.on('chainChanged', () => {
        window.location.reload()
      })
  } else {
      console.log("No authorized account found")
  }

    
   
  }


  const connectWallet = async () => {
    if(!ethereum) {
      alert('you need to install metamask')
    } else {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
      const account = accounts[0]
      setCurrentAccount(account)
    }

  }

  useEffect(() => {
    checkIfWalletIsConnected()
    getTotalMinted()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintCount])

  
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">KeepNFT Minter</p>
          <p className="sub-text">
           Discover your unique NFT today.
          </p>
        
          { currentAccount !== '' ? <MintUI mintNFT={mintNFT} isMintLoading={isMintLoading} /> : <NotConnected connectWallet={connectWallet} />}    
        </div>

        <div className='show-NFT'>
          
         

          <div style={showNFT}>
            { isFetchLoading ? <Loading /> : null }
          { mintCount ? (
            <>
              <p style={{color: '#a2ded0'}}> <b>{ `Count: ${mintCount}/${TOTAL_MINT_COUNT}` } </b></p>
            </>

          ) : null }

          </div>
        </div>

        <div className="footer-container">
          {window.ethereum.networkVersion === '4'  ?  (
            <>
              <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
              <a
                className="footer-text"
                href={TWITTER_LINK}
                target="_blank"
                rel="noreferrer"
              >{`powered by @${TWITTER_HANDLE}`}</a>
           </>
          
          ) : (
              <p style={{color: 'red', display: 'block'}}>Wrong network detected. Please switch to rinkeby</p>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default App;
