import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getContract } from "../redux/contractReducer";
import { getNftList } from "../redux/nftReducer";
import Paging from "../components/Paging";

const MyPage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const dispatch = useDispatch();
  const nftList = useSelector((state) => state.nft.list);
  const account = useSelector((state) => state.contract.account);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector((state) => state.contract.saleContract);
  console.log(nftList);

  if (nftList.length === 0) {
    // console.log("!nftList");
    dispatch(getNftList());
    return;
  }
  if (!eggToken.CA) {
    dispatch(getContract());
    return;
  }
  if (!account) {
    dispatch(getContract());
    return;
  }

  if (!account) return <Address>메타마스크를 연결해주세요</Address>;

  const buyBtnOnClick = async (nft) => {
    console.log("buyBtnOnClick");
    let price;
    do {
      price = prompt("판매하실 가격을 숫자로 적어주세요(단위:Wei)");
    } while (isNaN(price));
    console.log({ price });
    // 권한 받기
    await eggToken.deployed.methods.setApprovalForAll(saleContract.CA, true);

    const result = await saleContract.deployed.methods
      .ListFotSaleContract(nft.tokenId, price)
      .send({ from: account });
    console.log(result);
  };

  return (
    <>
      <MainContainer>
        <Address>계정 : {account}</Address>
        <ListWrap>
          <ItemsWrap>
            {nftList.slice(offset, offset + limit).map((item) => {
              if (item.owner == account)
                return (
                  <Cards key={item.tokenId}>
                    <img alt="Egg Token Img" src={item.image} />
                    <div>
                      <ItemTitle>
                        <Link
                          to={{
                            pathname: `/detail/${item.tokenId}`,
                          }}
                          style={{ textDecoration: "none", color: "inherit" }}
                          state={{ item }}
                        >
                          {item.name}
                        </Link>
                      </ItemTitle>
                      <div>{item.price} Wei</div>
                      <BtnWrap>
                        {item.state != "List" ? (
                          <Btn
                            onClick={() => {
                              buyBtnOnClick(item);
                            }}
                          >
                            Sell
                          </Btn>
                        ) : (
                          <Btn disabled>List</Btn>
                        )}
                      </BtnWrap>
                    </div>
                  </Cards>
                );
            })}
          </ItemsWrap>
        </ListWrap>
      </MainContainer>
      {nftList[0].owner == account ? (
        <Paging
          total={nftList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      ) : (
        ""
      )}
    </>
  );
};

const Address = styled.h1`
  text-align: center;
  padding-left: 3rem;
  font-size: 2.5rem;
`;

const MainContainer = styled.div``;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsWrap = styled.div`
  padding-top: 1rem;
  text-align: center;
  display: grid;
  align-content: center;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
`;

const ItemTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Cards = styled.div`
  width: 15rem;
  height: 22rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  background-color: white;

  > img {
    width: 200px;
    margin: 1rem 0 1rem 0;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 100px;
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
export default MyPage;
