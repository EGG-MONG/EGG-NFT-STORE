import React from "react";
import styled from "styled-components";

const Paging = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <PagingWrap>
      <BtnStyle onClick={() => setPage((page = 1))} disabled={page === 1}>
        &lt;&lt;
      </BtnStyle>
      <BtnStyle onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </BtnStyle>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <BtnStyle key={i + 1} onClick={() => setPage(i + 1)}>
            {i + 1}
          </BtnStyle>
        ))}
      <BtnStyle onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </BtnStyle>
      <BtnStyle onClick={() => setPage(numPages)} disabled={page === numPages}>
        &gt; &gt;
      </BtnStyle>
    </PagingWrap>
  );
};

const PagingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem;
`;

const BtnStyle = styled.button`
  border: none;
  padding: 8px;
  border-radius: 1rem;
  background: transparent;
  color: black;
  font-size: 1rem;

  :hover {
    color: white;
    background: plum;
    cursor: pointer;
  }

  :disabled {
    display: none;
  }
`;
export default Paging;
