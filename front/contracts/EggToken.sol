// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";


contract EggToken is ERC721Enumerable, Ownable {

    // 최대 발행량
    uint8 constant public MAX_TOKEN_COUNT = 100;

    // 민팅 시 지불할 이더 가격을 나타내주는 상태변수
    uint public mintPrice = 10 wei;

    // json metadata URI
    string public metadataURI;

    // 발행된 토큰 목록
    uint256[] tokenList;

    // minting 이벤트 등록
    event Minting(uint256 tokenId, string state, uint price, address from, address to);

    // 생성자 함수
    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC721 (_name, _symbol) {
        metadataURI = _metadataURI;
    }

    function mintToken(address _saleContractCA) public payable {

        // mintPrice보다 지불하려는 가격이 이상일 경우에만 발행한다
        require(msg.value >= mintPrice,"EggToken : Be short of money");

        // 최대발행량이 현재 총발행량보다 클 때만 발행한다.
        require(MAX_TOKEN_COUNT > totalSupply(), "EggToken : It exceeded the maximum amount issued");

        // CA에 지급받은 이더를 전송해준다.
        payable(Ownable.owner()).transfer(msg.value);

        uint256 tokenId = totalSupply() + 1;
        // 함수를 호출한 계정(배포자)에 NTF 발행
        _mint(msg.sender, tokenId);

        setApprovalForAll(_saleContractCA, true);

        tokenList.push(tokenId);

        emit Minting(tokenId, "Minted", 0, address(0), msg.sender);
    }

    function tokenURI(uint _tokenId) public override view returns (string memory) {

        string memory tokenIdStr = Strings.toString(_tokenId);
        return string(abi.encodePacked(metadataURI, "/", tokenIdStr,".json"));
    }

    function setMetadataURI(string memory _uri) public onlyOwner {
        metadataURI = _uri;
    } 
}