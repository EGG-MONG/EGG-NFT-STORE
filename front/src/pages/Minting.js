import styled from "styled-components";
// import EggToken from "../contracts/EggToken.json";
// import SaleContract from "../contracts/SaleContract.json";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../redux/contractReducer";

const Minting = (/*{ web3, account }*/) => {
  const dispatch = useDispatch();
  // const web3 = useSelector((state) => state.contract.web3);
  const account = useSelector((state) => state.contract.account);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector((state) => state.contract.saleContract);
  
  if(!eggToken.CA){
    dispatch(getContract());
    return;
  }

  const minting = async () => {
    const tokenId = Math.floor(Math.random() * 100) + 1;
    const result = await eggToken.deployed.methods.mintToken(saleContract.CA, tokenId).send({ from: account, value : 100 });
    console.log(result);
  };

  return (
    <>
      <MintingArea>
        <img
          src="/Img/loading.gif"
          alt="loadingImg"
          onClick={minting}
          style={{ width: "700px", cursor: "pointer" }}
        />
        <Price>only 100wei</Price>
      </MintingArea>
    </>
  );
};

const MintingArea = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Price = styled.h1`
  font-size: 3rem;
  &:hover {
    color: plum;
  }
`;
export default Minting;
