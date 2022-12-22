// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "./EggToken.sol";

contract SaleToken {
    // EggToken을 담을 상태변수
    EggToken public Token;

    // token의 아이디 => price(토큰의 가격);
    mapping(uint => uint) public tokenPrices;

    // 토큰 정보 구조체
    struct TokenInfo {
        uint tokenId;
        uint price;
    }

    uint[] public SaleTokenList;

    // 판매 등록 이벤트 등록
    event List(uint tokenId, string state, uint price, address from, address to);

    // 구매 이벤트 등록
    event Sale(uint tokenId, string state, uint price, address from, address to);

    // 교환 이벤트 등록
    event Transfer(uint tokenId, string state, uint price, address from, address to);

    // 생성자에서 배포된 EggToken CA를 받아서 Token 상태변수에 저장한다.
    constructor(address _eggTokenCA) {
        Token = EggToken(_eggTokenCA);
    }

    // 판매 등록 함수
    function ListFotSaleToken(uint _tokenId, uint _price) public {
        address tokenOwner = Token.ownerOf(_tokenId);

        // 판매가격이 0 이하면 함수 종료
        require(_price > 0, "The selling price must be at least zero");

        // 함수를 실행하는 사람(판매자)이 모든 권한이 있는지 판단한다.
        require(msg.sender == tokenOwner, "be not the owner" );

        // require(Token.isApprovedForAll(msg.sender, address(this)), "approve caller is not owner nor approved for all");

        // 토큰의 가격을 토큰아이디 인덱스에 추가한다.
        tokenPrices[_tokenId] = _price;

        // 판매 리스트 배열에 추가
        SaleTokenList.push(_tokenId);

        emit List(_tokenId, "List", _price, msg.sender, address(0));
    }

    function PurchaseToken(uint _tokenId) public payable {
        // 토큰 소유자 계정
        address tokenOwner = Token.ownerOf(_tokenId);

        // 토큰 소유자가 자신의 토큰을 구매하는 것을 막는다.
        require(tokenOwner != msg.sender, "Owner cannot buy");

        // 판매중인 토큰만 구매할 수 있게 한다ㅏ.
        require(tokenPrices[_tokenId] > 0, "Tokens are not for sale");

        // 구매자가 지불할 금액이 판매 가격 이상인지 확인한다.
        require(tokenPrices[_tokenId] <= msg.value, "Offer more than the selling price");

        // CA가 토큰 판매자에게 이더를 전송한다.
        payable(tokenOwner).transfer(msg.value);
        
        // 토큰의 소유권을 구매자에게 이전한다.
        // Token.newTransfer(msg.sender, _tokenId);
        Token.transferFrom(tokenOwner, msg.sender, _tokenId);
        // 판매 가격이 0으로 변경해 판매중지 상태로 변경한다.
        tokenPrices[_tokenId] = 0;   

        popSaleToken(_tokenId); 

        emit Sale(_tokenId, "Sale", msg.value, tokenOwner, msg.sender);
        emit Transfer(_tokenId, "Transfer", 0, tokenOwner, msg.sender);
    }

    function popSaleToken(uint _tokenId) private returns (bool) {
        for (uint256 i = 0; i < SaleTokenList.length; i++) {
            if(SaleTokenList[i] == _tokenId){
                // 마지막에 저장되어 있던 요소를 삭제해야할 인덱스에 저장
                SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];

                // 배열의 마지막 요소 삭제
                SaleTokenList.pop();
                return true;
            }
        }
        return false;
    }
    
    // 전체 판매 리스트 확인 view
    function getSaleTokenList() public view returns (TokenInfo[] memory){
        
        // 판매 리스트가 한 개 이상일 경우에만 실행
        require(SaleTokenList.length > 0);
        
        TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);

        for (uint256 i = 0; i < SaleTokenList.length; i++) {
            uint tokenId = SaleTokenList[i];
            uint price = tokenPrices[tokenId];
            // 토큰 인포 구조체 생성해서 저장
            list[i] = TokenInfo(tokenId, price);
        }
        return list;
    }

    // 소유중인 NFT 리스트를 보여주는 함수
    function getOwnerToken(address _tokenOwner) public view returns (TokenInfo[] memory) {
        uint balance = Token.balanceOf(_tokenOwner);

        require(balance > 0);

        TokenInfo[] memory list = new TokenInfo[](balance);

        for (uint256 i = 0; i < balance; i++) {
            // 소유 중인 토큰을 순서대로 가지고 온다.
            uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
            uint price = tokenPrices[tokenId];

            // 토큰 인포 구조체 생성해서 저장
            list[i] = TokenInfo(tokenId, price);
        }

        return list;
    }

    // 가장 최근에 구매한 토큰 정보 가져오는 함수
    function getLatestToken(address _tokenOwner) public view returns (TokenInfo memory) {
        // 토큰 갯수 가져오기
        uint balance = Token.balanceOf(_tokenOwner);

        // 최근에 구매한 토큰 아이디
        uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
        uint price = tokenPrices[tokenId];

        return TokenInfo(tokenId, price);
    }

}   