import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { table, card } from "react-bootstrap";

const Detail = () => {
  const location = useLocation();
  const nft = location.state.item;
  console.log(nft.transfers);
  return (
    <>
      <EntireWrap>
        <InfoWrap>
          <ImageWrap>
            <DetailImg src={nft.image} alt="sellingItems" />
          </ImageWrap>
          <div>
            <NftTitle>{nft.name}</NftTitle>
            <OwnerArea>
              Owned by <OwnerName>&nbsp;{nft.owner}</OwnerName>
            </OwnerArea>
            <OwnerArea>
              Maker by <OwnerName>&nbsp;{nft.maker}</OwnerName>
            </OwnerArea>
            <PriceBox>
              <span>{nft.price}</span>&nbsp; Wei
            </PriceBox>
            <BtnBox>
              <Button>Buy</Button>
              <Button>Sell</Button>
            </BtnBox>
          </div>
        </InfoWrap>

        <DetailWrap>
          <div className="card">
            <div className="card-header">ABOUT</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{nft.description}</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header">PROPERTIES</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {nft.attributes.map((item, idx) => (
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
              {nft.transfers.map((item, idx) => (
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
