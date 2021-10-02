import React from 'react'
import Loading from './loading/loading.component'

const MintUI = ({ mintNFT, isMintLoading }) => {
  const openseaID = 'squarenft-xpens4bkio'

  return (
    <>
      {isMintLoading ? <Loading /> : (
        <>
          <button className="cta-button connect-wallet-button" onClick={mintNFT}>
            Mint
          </button>
        </>
      )}
      
      <a
        className="opensea"
        href={`https://testnets.opensea.io/collection/${openseaID}`}
        target="_blank"
        rel="noopener  noreferrer"
      >View Opensea Collections</a>
  
    </>
  )
}



export default MintUI
