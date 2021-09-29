
const main = async() => {
  const MyEpicNFT = await hre.ethers.getContractFactory('MyEpicNFT')
  const myEpicNFT = await MyEpicNFT.deploy()
  await myEpicNFT.deployed()
  console.log('Contract deployed to: ', myEpicNFT.address)

  let txn  = await myEpicNFT.makeAnEpicNFT()
  await txn.wait()

  txn  = await myEpicNFT.makeAnEpicNFT()
  await txn.wait()


  const tokenOwner = await myEpicNFT.getNFTOwner(0);
  console.log('yo here', tokenOwner)
  
}


const runMain = async () => {
  try {
    await main()
    process.exit(0)
    
  } catch(err) {
    process.exit(1);    
  }
}

runMain()