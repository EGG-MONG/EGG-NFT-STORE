import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
  const location = useLocation();
  const nft = location.state.item;
  return (
    <>
      <EntireWrap>
        <InfoWrap>
          <div>
            <DetailImg src={nft.image} alt="sellingItems" />
          </div>
          <div>
            <NftTitle>{nft.name}</NftTitle>
            <OwnerArea>
              Owned by <OwnerName>{nft.owner}</OwnerName>
            </OwnerArea>
            <OwnerArea>
              Maker by <OwnerName>{nft.maker}</OwnerName>
            </OwnerArea>
            <PriceBox>{nft.price}Wei</PriceBox>
            {/* <IconBox>
              <span>
                <img src="/view.png" alt="icon" />
                &nbsp;views
              </span>
              <span>
                <img src="/like.png" alt="icon" />
                &nbsp;likes
              </span>
            </IconBox> */}
            <BtnBox>
              <Button>Buy</Button>
              <Button>cart</Button>
              <Button>Sell(Offer)</Button>
            </BtnBox>
          </div>
        </InfoWrap>

        <DetailWrap>
          <ul>
            <li>ABOUT</li>
            {nft.description}<br/><br/>
            <li>PROPERTIES</li>
            {
              nft.attributes.map(item => (
                <>{item.trait_type} : {item.value} <br/></>
              ))
            }<br/>
            <li>TRANSFER</li>
            <table>
                <thead>
                <tr>
                  <th>state</th>
                  <th>price</th>
                  <th>from</th>
                  <th>to</th>
                  <th>date</th>
                </tr>
                </thead>
                {
                  nft.transfers.map(item => (
                      <tr>
                        <td>{item.state}</td>
                        <td>{item.price}</td>
                        <td>{item.from == "0x0000000000000000000000000000000000000000" ? "" : item.from }</td>
                        <td>{item.to == "0x0000000000000000000000000000000000000000" ? "" : item.to }</td>
                        <td>{item.createdAt}</td>
                      </tr>
                  ))
                }
            </table>
          </ul>
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
  grid-template-columns: repeat(2, 5fr);
  justify-content: center;
  align-items: center;
  column-gap: 2rem;

  > div:first-child {
    width: 500px;
    height: 500px;
    background-color: #b2b2b2;
    border-radius: 1rem;
  }
`;

const DetailImg = styled.img`
  width: inherit;
  height: inherit;
`;

const NftTitle = styled.h1`
  font-size: 3rem;
`;

const OwnerArea = styled.div`
  margin-bottom: 1rem;
`;

const OwnerName = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;

const PriceBox = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const IconBox = styled.div`
  width: 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  > span {
    display: inherit;
    align-items: center;
  }
  > span > img {
    width: 2rem;
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
  width: 10rem;
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
  margin-top: 2rem;
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default Detail;
