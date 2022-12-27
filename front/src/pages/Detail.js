import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { table, card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../redux/contractReducer";
import { nftEvent } from "../func/eventProcessing";
import { getNftList, modifyNftList, modifyNftSale } from "../redux/nftReducer";

const Detail = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const tokenId = location.state.tokenId;
  const nftList = useSelector((state) => state.nft.list);

  const account = useSelector((state) => state.contract.account);
  const web3 = useSelector((state) => state.contract.web3);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector(state => state.contract.saleContract);

  if (!nftList.length) {
    console.log("!nftList"); 
    dispatch(getNftList());
  }

  if(!eggToken.CA){
    dispatch(getContract());
  }

  let index;
  nftList.map((item, i) => {
    if(item.tokenId == tokenId) index = i;
  })

  const buyBtnOnClick = async (nft) => {
    
    const answer = window.confirm(nft.price+'Wei에 구매하시겠습니까?');

    if(!answer) return;

    // 권한 받기
    await eggToken.deployed.methods.setApprovalForAll(saleContract.CA, true);
    
    const result = await saleContract.deployed.methods.PurchaseToken(nft.tokenId).send({from: account, value: nft.price});
    console.log(result);
    
    const sale = await nftEvent(web3, result.events.Sale);
    const transfer = await nftEvent(web3, result.events.Transfer);

    dispatch(modifyNftSale(transfer.tokenId, transfer.transaction, transfer.transfer, sale.transfer));
  }

  const sellBtnOnClick = async (nft) => {
    console.log("sellBtnOnClick");
    let price;
    do {
      price = prompt("판매하실 가격을 숫자로 적어주세요(단위:Wei)");
    } while (isNaN(price));
    console.log({ price });
    // 권한 받기
    await eggToken.deployed.methods.setApprovalForAll(saleContract.CA, true);

    const result = await saleContract.deployed.methods
      .ListFotSaleContract(nft.tokenId, price)
      .send({ from: account });

    const list = await nftEvent(web3, result.events.List);
    dispatch(modifyNftList(list.tokenId, list.transaction, list.transfer));
  };



  return (
    <>
      <EntireWrap>
        <InfoWrap>
          <ImageWrap>
            <DetailImg src={nftList[index].image} alt="sellingItems" />
          </ImageWrap>
          <div>
            <NftTitle>{nftList[index].name}</NftTitle>
            <OwnerArea>
              Owned by <OwnerName>&nbsp;{nftList[index].owner}</OwnerName>
            </OwnerArea>
            <OwnerArea>
              Maker by <OwnerName>&nbsp;{nftList[index].maker}</OwnerName>
            </OwnerArea>
            <PriceBox>
              <span>{nftList[index].price}</span>&nbsp; Wei
            </PriceBox>
            <BtnBox>
              {
                nftList[index].price == 0 && nftList[index].owner == account ? 
                <Button onClick={() => {
                  sellBtnOnClick(nftList[index]);
                }}>Sell</Button> : 
                nftList[index].price != 0 && nftList[index].owner != account ? 
                <Button onClick={()=>{
                  buyBtnOnClick(nftList[index]);
                }}>Buy</Button> : ""
              }
              
              
            </BtnBox>
          </div>
        </InfoWrap>

        <DetailWrap>
          <div className="card">
            <div className="card-header">ABOUT</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{nftList[index].description}</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header">PROPERTIES</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {nftList[index].attributes.map((item, idx) => (
                  <div key={idx}>
                    {item.trait_type} : {item.value} <br />
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <br />
          <h1>TRANSFER</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">state</th>
                <th scope="col">price</th>
                <th scope="col">from</th>
                <th scope="col">to</th>
                <th scope="col">date</th>
              </tr>
            </thead>
            <tbody>
              {/* 여기 for문으로 돌려서(?) 최신순으로 정렬되게 */}
              {nftList[index].transfers.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.state}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.from == "0x0000000000000000000000000000000000000000"
                      ? ""
                      : item.from}
                  </td>
                  <td>
                    {item.to == "0x0000000000000000000000000000000000000000"
                      ? ""
                      : item.to}
                  </td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DetailWrap>
      </EntireWrap>
    </>
  );
};

const EntireWrap = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoWrap = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
`;

const ImageWrap = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgb(234, 234, 234);
  border-radius: 1rem;
  display: inherit;
  justify-items: center;
  align-content: center;
`;

const DetailImg = styled.img`
  width: 550px;
  height: 550px;
`;

const NftTitle = styled.h1`
  font-size: 4rem;
`;

const OwnerArea = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const OwnerName = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

const PriceBox = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;

  > span {
    font-size: 3rem;
    color: plum;
  }
`;

const BtnBox = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 2fr);
  row-gap: 0.5rem;
  margin-top: 3rem;
`;

const Button = styled.button`
  cursor: pointer;
  width: 15rem;
  height: 2.5rem;
  font-size: 1.5rem;
  padding-top: 0.3rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 0.5px solid gray;

  &:hover {
    background-color: plum;
    color: white;
  }
`;

const DetailWrap = styled.div`
  width: 100vw;
  height: inherit;
  margin-top: 5rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 80vw;
    margin-bottom: 2rem;
  }

  > table {
    width: 80vw;
    margin: 2rem 0 7rem 0;
  }
`;

export default Detail;
