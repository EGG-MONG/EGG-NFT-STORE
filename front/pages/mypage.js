import React from "react";
import styled from "styled-components";
import useWeb3 from "./hooks/useWeb3";

const mypage = () => {
  const [web3, account] = useWeb3();
  if (!account) return <h1>메타마스크를 연결해주세요</h1>;

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
  font-weight: 800;
`;

const MenuWrap = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
`;
export default mypage;
