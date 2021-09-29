// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("SquareNFT", "SQUARE") {
    console.log("NFT here");

  }

  function makeAnEpicNFT() public {
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, "https://jsonkeeper.com/b/9R4E");
    console.log("NFT id %s minted by %s", newItemId, msg.sender);
    _tokenIds.increment();

  }


  function getNFTOwner(uint _tokenId) public view returns(address tokenOwner) {
    tokenOwner = ownerOf(_tokenId);
    console.log("%s token owner", tokenOwner);
  } 

}