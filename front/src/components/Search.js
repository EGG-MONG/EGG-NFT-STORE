import React from "react";
import styled from "styled-components";

const Search = () => {
  return (
    <>
      <SearchBar />
      <SearchButton>SERACH</SearchButton>
    </>
  );
};

const SearchBar = styled.input`
  width: 20rem;
  height: 2rem;
  border: 1px solid gray;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  margin-left: 3rem;
`;

const SearchButton = styled.button`
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  border: 1px solid gray;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;
export default Search;
