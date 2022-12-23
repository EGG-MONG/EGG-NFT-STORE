import React from "react";
import styled from "styled-components";

const MyPage = ({ web3, account }) => {
  if (!account) return <Address>메타마스크를 연결해주세요</Address>;

  return (
    <>
      <div>
        <Address>계정 : {account}</Address>
        <MenuWrap></MenuWrap>
      </div>
    </>
  );
};
const Address = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
  font-size: 2rem;
`;

const MenuWrap = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
`;
export default MyPage;
