import styled from "styled-components";

const minting = () => (
  <>
    <MintingArea></MintingArea>
  </>
);

const MintingArea = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export default minting;
