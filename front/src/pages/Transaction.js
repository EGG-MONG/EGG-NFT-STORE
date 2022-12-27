import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Transaction = () => {
    const location = useLocation();
    const transaction = location.state.item; // location으로 데이터에 접근해서 받아온다!
    const tokenId = location.state.tokenId; // location으로 데이터에 접근해서 받아온다!
    console.log(transaction);
    const transactionView = () => {
        let list = [];
        for(const key in transaction) {
            list.push(<li>{key} : {transaction[key]}</li>)
        }
        return list;
    }

  return (
    <ul>
        {
            transactionView()
        }
        <Btn>
            <Link to={{
                pathname: `/detail/${tokenId}`,
            }}
            style={{ textDecoration: "none", color: "inherit" }}
            state={{ tokenId }}
            >
            이전 페이지
            </Link>
        </Btn>
    </ul>
  )
}

const Btn = styled.button`
  cursor: pointer;
  width: 150px;
  height: 2rem;
  font-size: 1.2rem;
  padding-top: 0.3rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 0.5px solid gray;

  &:hover {
    background-color: plum;
    color: white;
  }
`;

export default Transaction;