import Link from "next/link";
import Search from "../pages/components/Search";
import Paging from "../pages/components/Paging";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/Image";

const index = () => {
  // 페이지 네이션
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // data 불러오기
  useEffect(() => {}, []);

  return (
    <>
      <SearchWrap>
        <Search />
      </SearchWrap>
      <ListWrap>
        <ItemsWrap>
          {items.slice(offset, offset + limit).map(({ id, title }) => (
            <Cards key={id}>
              <Image
                alt="example"
                src="/Img/example.jpg"
                width={200}
                height={200}
              />
              <div>
                <ItemTitle>
                  <Link href="/detail">{title}</Link>
                </ItemTitle>
                <div>{id}ETH</div>
                <BtnWrap>
                  <Btn>cart</Btn>
                  <Btn>buy</Btn>
                </BtnWrap>
              </div>
            </Cards>
          ))}
        </ItemsWrap>
      </ListWrap>
      <Paging
        total={items.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

const SearchWrap = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.3rem;
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemsWrap = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
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
  height: 20rem;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Btn = styled.button`
  width: 100px;
`;
export default index;
