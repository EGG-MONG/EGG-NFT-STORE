import styled from "styled-components";

const upload = () => (
  <>
    <UploadArea>
      <UploadBtn>UPLOAD</UploadBtn>
    </UploadArea>
  </>
);

const UploadArea = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const UploadBtn = styled.button`
  cursor: pointer;
  width: 5rem;
  height: 3rem;
  border: 1px solid gray;
  background: transparent;
  border-radius: 1rem;
  font-weight: 800;
`;
export default upload;
