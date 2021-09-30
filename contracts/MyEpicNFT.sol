// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string baseSVG = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] wordOne = ['Adept', 'Unwavering', 'Sage', 'Coolio', 'NonStop', 'Cross'];
  string[] wordTwo = ['Thoughtful', 'Juicy', 'Crowned', 'Undisputed', 'Dogged', 'Thorough'];
  string[] wordThree = ['Opionated', 'Reimagined', 'Unbending', 'Corrosive', 'Breathe', 'Exhale'];

  constructor() ERC721("SquareNFT", "SQUARE") {
    console.log("NFT here");

  }


  function random(string memory _input) internal pure returns(uint256) {
    return uint256(keccak256(abi.encodePacked(_input)));
  }

  function selectRandomWordOne(uint256 _tokenId) public view returns(string memory) {
    uint256 rand = random(string(abi.encodePacked('KeepOn', Strings.toString(_tokenId))));
    rand = rand % wordOne.length;
    return wordOne[rand];
  }


  function selectRandomWordTwo(uint256 _tokenId) public view returns(string memory) {
    uint256 rand = random(string(abi.encodePacked('Chain', Strings.toString(_tokenId))));
    rand = rand % wordTwo.length;
    return wordTwo[rand];
  }


  function selectRandomWordThree(uint256 _tokenId) public view returns(string memory) {
    uint256 rand = random(string(abi.encodePacked('RandomNFT', Strings.toString(_tokenId) )));
    rand = rand % wordThree.length;
    console.log('random num from 3', rand);
    return wordThree[rand];
  }

  function makeAnEpicNFT() public {
    uint256 newItemId = _tokenIds.current();

    string memory selectedWordOne = selectRandomWordOne(newItemId);
    string memory selectedWordTwo = selectRandomWordTwo(newItemId);
    string memory selectedWordThree = selectRandomWordThree(newItemId);

    string memory finalSVG = string(abi.encodePacked(baseSVG, selectedWordOne, selectedWordTwo, selectedWordThree, '</text></svg>'));
    console.log('\n____________________');
    console.log(finalSVG);
    console.log('\n_____________________');



    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, "alpha testing");
    console.log("NFT id %s minted by %s", newItemId, msg.sender);
    _tokenIds.increment();

  }


  function getNFTOwner(uint _tokenId) public view returns(address tokenOwner) {
    tokenOwner = ownerOf(_tokenId);
    console.log("%s token owner", tokenOwner);
  } 

}