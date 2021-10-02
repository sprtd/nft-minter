const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { metadata } = require('../utils/metadata')

describe("MyEpicNFT",  () => {
  let MyEpicNFT, myEpicNFT, owner, addr1, addr2

  beforeEach(async() => {
    MyEpicNFT = await ethers.getContractFactory('MyEpicNFT')
    myEpicNFT = await MyEpicNFT.deploy();
    [owner, addr1, addr2] = await ethers.getSigners()
  })
  
  describe('Deployment', () => {
    it("Should return NFT name", async () => {
  
      expect(await myEpicNFT.name()).to.equal("SquareNFT");
      expect(await myEpicNFT.symbol()).to.equal("SQUARE");
    });
  })

  describe('Mint NFT', () => {
    it("Allows addr1 to mint NFT", async () => {

    
    
      const txn = await myEpicNFT.connect(addr1).mintNFT()
      await txn.wait()

      const { from } = txn

      

      const nftOwner = await myEpicNFT.getNFTOwner(0)
      
      console.log('from account', from )
      assert(from, addr1)
      assert(nftOwner, addr1) // check if nft owner is address 1
    });

    it('Reverts attempt to mint above 50 NFTs', async() => {
      const REVERT = `VM Exception while processing transaction: reverted with reason string 'no more NFT to mint`

      try {
        const totalMints = 51;
        for(i = 0; i < totalMints; i++) {
          const txn = await myEpicNFT.connect(addr1).mintNFT()
          await txn.wait()
  
          const getTotalMints = await myEpicNFT.getTotalMints()
          console.log({totalMintsHere: getTotalMints.toNumber()})
        } 
        
        throw null
      } catch(err) {
         assert(err.message.startsWith(REVERT), `Expected ${REVERT} but got ${err.message} instead`)

      }
    })
  })

});
