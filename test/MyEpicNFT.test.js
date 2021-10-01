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
      assert(nftOwner, addr1) // check if nft owner is addrss 1
      
   
      const tokenURI = await myEpicNFT.tokenURI(0) 
      console.log('token uri', tokenURI)
      assert.equal(tokenURI, metadata) // check if token uri matches 

    });

    

  })



 

  
});
