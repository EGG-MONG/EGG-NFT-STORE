import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getContract } from "../redux/contractReducer";
import { getNftList } from "../redux/nftReducer";
import Paging from "./Paging";

const MyNft = () => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const dispatch = useDispatch();
  const nftList = useSelector((state) => state.nft.list);
  const account = useSelector((state) => state.contract.account);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector(state => state.contract.saleContract);
  

  if(!nftList.length) {
    dispatch(getNftList());
    return;
  }
  if(!eggToken.CA){
    dispatch(getContract());
    return;
  }

  const buyBtnOnClick = async (nft) => {
    let price;
    do {
      price = prompt('판매하실 가격을 숫자로 적어주세요(단위:Wei)');
    }while(isNaN(price))
    
    // 권한 받기
    await eggToken.deployed.methods.setApprovalForAll(saleContract.CA, true);
    
    const result = await saleContract.deployed.methods.ListFotSaleContract(nft.tokenId, price).send({from: account});
    console.log(result);

  }

  return (
    <>
      <MainContainer>
        <ItemsWrap>
          {nftList.map((item) => {
            if(item.owner == account)
            return (
            <Cards key={item.tokenId}>
              <img alt="Egg Token Image" src={item.image} />
              <div>
                <ItemTitle>
                  <Link to={{
                    pathname: `/detail/${item.tokenId}`,
                  }}
                  state={{ item }}>{item.name}</Link>
                </ItemTitle>
                <div>{item.price} ETH</div>
                <BtnWrap>
                  <Btn onClick={buyBtnOnClick}>SALE</Btn>
                </BtnWrap>
              </div>
            </Cards>
          )})}

        </ItemsWrap>
      </MainContainer>
      <Paging
        total={nftList.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

const MainContainer = styled.div`
  width: 93vw;
  height: 78vh;
  background-color: rgba(243, 182, 243, 0.2); ;
`;

const ItemsWrap = styled.div`
  padding-top: 2rem;
  text-align: center;
  display: grid;
  align-content: center;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
`;

const ItemTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Cards = styled.div`
  width: 15rem;
  height: 21rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  background-color: white;

  > img {
    width: 200px;
    margin-top: 1rem;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 2rem;
  font-size: 1.2rem;
  padding-top: 0.3rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 0.5px solid gray;

  &:hover {
    background-color: plum;
    color: white;
  }
`;
export default MyNft;
