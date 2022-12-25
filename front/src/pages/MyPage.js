import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FavoriteNft from "../components/FavoriteNft";
import MyNft from "../components/MyNft";
import UploadedNft from "../components/UploadedNft";

const MyPage = (/*{ web3, account }*/) => {
  const web3 = useSelector((state) => state.web3.web3);
  const account = useSelector((state) => state.web3.account);

  const menuArr = ["구매한 NFT", "업로드 한 NFT", "즐겨찾기"];

  const [index, setIndex] = useState(0);

  const clickHandler = (idx) => {
    setIndex(idx);
  };

  const pages = {
    0: <MyNft />,
    1: <UploadedNft />,
    2: <FavoriteNft />,
  };

  if (!account) return <Address>메타마스크를 연결해주세요</Address>;

  return (
    <>
      <div>
        <Address>계정 : {account}</Address>
        <MenuWrap>
          <TabTitle>
            {menuArr.map((menu, idx) => {
              return (
                <li key={idx} onClick={() => clickHandler(idx)}>
                  {menu}
                </li>
              );
            })}
          </TabTitle>
          <div>{pages[index]}</div>
        </MenuWrap>
      </div>
    </>
  );
};

const Address = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
  font-size: 2.5rem;
`;

const MenuWrap = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
`;

const TabTitle = styled.ul`
  display: flex;
  justify-items: center;
  align-items: center;

  > li {
    cursor: pointer;
    width: 15rem;
    height: 3rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background-color: #b2b2b2;
    font-size: 1.5rem;
    text-align: center;
    padding-top: 0.7rem;
    margin-right: 3rem;

    > li:active {
      background-color: plum;
    }
  }
`;

export default MyPage;
