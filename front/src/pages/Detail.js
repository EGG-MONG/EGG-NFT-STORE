import React from "react";
import styled from "styled-components";

const Detail = () => {
  return (
    <>
      <EntireWrap>
        <InfoWrap>
          <div>
            <DetailImg src="/Img/example.jpg" alt="sellingItems" />
          </div>
          <div>
            <NftTitle>NFT-TEST-NAME</NftTitle>
            <OwnerArea>
              Owned by <OwnerName>Owner</OwnerName>
            </OwnerArea>
            <PriceBox>0.5ETH</PriceBox>
            <IconBox>
              <span>&nbsp;views</span>
              <span>&nbsp;likes</span>
            </IconBox>
            <BtnBox>
              {/* <Button>Buy</Button>
              <Button>cart</Button>
              <Button>Sell(Offer)</Button> */}
            </BtnBox>
          </div>
        </InfoWrap>

        <DetailWrap>
          <div>
            <ul>
              <li>Contract Address</li>
              <li>Token ID</li>
              <li>Token Standard</li>
              <li>Chain </li>
            </ul>
          </div>
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
`;

const NftTitle = styled.h1`
  font-size: 3rem;
`;

const OwnerArea = styled.div`
  margin-bottom: 1rem;
`;

const OwnerName = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
`;

const PriceBox = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const IconBox = styled.div`
  width: 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DetailImg = styled.img`
  border-radius: 1rem;
  margin: 2rem;
`;

const BtnBox = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 2fr);
  row-gap: 0.5rem;
  margin-top: 3rem;
`;

const DetailWrap = styled.div`
  width: 100vw;
  height: inherit;
  background-color: aliceblue;
`;
export default Detail;
