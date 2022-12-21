import React from "react";
import styled from "styled-components";
import NavBar from "../pages/components/NavBar";
const detail = () => {
  return (
    <>
      <NavBar />
      <EntireWrap>
        <MainContainer>
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
        </MainContainer>

        <MainContainer>
          <div>
            <ul>
              <li>Contract Address</li>
              <li>Token ID</li>
              <li>Token Standard</li>
              <li>Chain </li>
            </ul>
          </div>
        </MainContainer>
      </EntireWrap>
    </>
  );
};

const EntireWrap = styled.div`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainContainer = styled.div`
  display: flex;
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

export default detail;
