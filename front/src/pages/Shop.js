// import Search from "../components/Search";
import Paging from "../components/Paging";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNftList, modifyNftSale } from "../redux/nftReducer";
import { getContract } from "../redux/contractReducer";
import { nftEvent } from "../func/eventProcessing";

const Shop = () => {
  const dispatch = useDispatch();
  
  const nftList = useSelector((state) => state.nft.list);

  const account = useSelector((state) => state.contract.account);
  const web3 = useSelector((state) => state.contract.web3);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector(state => state.contract.saleContract);

  // 판매 상태인 애들만 새로운 배열로 만들었음
  const listed = nftList.filter((item) => {
    if (item.state === "List") return item;
  });
  // console.log(listed);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  if (nftList.length === 0) {
    dispatch(getNftList());
  }
  if(!eggToken.CA){
    dispatch(getContract());
  }
  console.log(nftList);
  // 페이지 네이션
  // const [items, setItems] = useState([
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  //   { id: 1, title: "example-NFT", price: 10 },
  // ]);

  const offset = (page - 1) * limit;

  const buyBtnOnClick = async (nft) => {
    
    const answer = window.confirm(nft.price+'Wei에 구매하시겠습니까?');

    if(!answer) return;

    // 권한 받기
    await eggToken.deployed.methods.setApprovalForAll(saleContract.CA, true);
    
    const result = await saleContract.deployed.methods.PurchaseToken(nft.tokenId).send({from: account, value: nft.price});
    console.log(result);
    
    const sale = await nftEvent(web3, result.events.Sale);
    const transfer = await nftEvent(web3, result.events.Transfer);

    dispatch(modifyNftSale(transfer.tokenId, transfer.transaction, transfer.transfer, sale.transfer));
  }

  return (
    <>
      {/* <SearchWrap>
        <Search />
      </SearchWrap> */}
      <ListWrap>
        <ItemsWrap>
          {listed.slice(offset, offset + limit).map((item) => {
            if (item.price != 0)
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
                        state={{ tokenId: item.tokenId }}
                      >
                        {item.name}
                      </Link>
                    </ItemTitle>
                    <div>{item.price} Wei</div>
                    <BtnWrap>
                      {/* <Btn>CART</Btn> */}
                      {item.owner == account ? (
                        <Btn disabled>List</Btn>
                      ) : (
                        <Btn onClick={()=>{
                          buyBtnOnClick(item);
                        }}>BUY</Btn>
                      )}
                    </BtnWrap>
                  </div>
                </Cards>
              );
          })}
        </ItemsWrap>
      </ListWrap>
      <Paging
        total={listed.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

// const SearchWrap = styled.div`
//   width: inherit;
//   height: inherit;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 1.3rem;
// `;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsWrap = styled.div`
  padding-top: 2rem;
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
export default Shop;
