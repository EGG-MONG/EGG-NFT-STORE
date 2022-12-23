import Search from "../components/Search";
import Paging from "../components/Paging";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Shop = () => {
  // 페이지 네이션
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

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
              <Image alt="example" src="/Img/example.jpg" />
              <div>
                <ItemTitle>
                  <Link to="/detail">{title}</Link>
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
const Image = styled.image`
  width: 200px;
  height: 200px;
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
export default Shop;
