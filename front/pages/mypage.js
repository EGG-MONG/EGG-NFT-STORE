import React from "react";
import styled from "styled-components";

const mypage = () => {
  return (
    <>
      <div>
        <Address>1</Address>
        <MenuWrap></MenuWrap>
      </div>
    </>
  );
};
const Address = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
  font-size: 4rem;
  font-weight: 800;
`;

const MenuWrap = styled.div`
  width: inherit;
  padding-top: 3rem;
  padding-left: 3rem;
`;
export default mypage;
