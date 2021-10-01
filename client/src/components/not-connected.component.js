import React from 'react'

const NotConnected = ({ connectWallet }) => {
  return (
    <>
      <button className="cta-button connect-wallet-button" onClick={() => connectWallet()}>
        Connect Wallet
      </button>
    </>
  )
}



export default NotConnected
