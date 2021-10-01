import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { useState, useEffect } from "react";

import MintUI from './components/mint-UI.component'
import NotConnected from './components/not-connected.component'
// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState('')



  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if(!ethereum) {
      alert('you need to install metamask')
    } else {
      const accounts = await ethereum.request({ method: 'eth_accounts'})

      ethereum.on('accountsChanged', () => {
        window.location.reload()
      })

      ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      const account = accounts[0]

      setCurrentAccount(account)
      console.log('found account', account)
    }

  }


  const connectWallet = async () => {
    const { ethereum } = window
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

  }, [])
  // Render Methods
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          { currentAccount !== '' ? <MintUI /> : <NotConnected connectWallet={connectWallet} />}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
