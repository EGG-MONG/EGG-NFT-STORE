import Link from "next/link";
import Image from "next/Image";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavWrap>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={200} height={30} />
      </Link>
      <MenuWrap>
        <MenuBtn href="/mypage">
          <Image alt="Icon" src="/mypage.png" width={40} height={40} />
        </MenuBtn>
        <MenuBtn href="/upload">
          <Image alt="Icon" src="/upload.png" width={40} height={40} />
        </MenuBtn>
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

const MenuBtn = styled(Link)`
  margin: 1rem;
`;
export default NavBar;
