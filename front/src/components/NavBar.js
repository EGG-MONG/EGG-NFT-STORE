import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <NavWrap>
      <Link to="/">EGG MONG</Link>
      <MenuWrap>
        <Link to="/shop" style={{ marginRight: "1.5rem" }}>
          Shop
        </Link>
        <Link to="/mypage">MyPage</Link>
      </MenuWrap>
    </NavWrap>
  );
};

const NavWrap = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.2;
  padding-left: 3rem;
  padding-right: 3rem;
  // hover 애니메이션 추가하기
`;
const MenuWrap = styled.div`
  font-size: 2rem;
`;

export default NavBar;
