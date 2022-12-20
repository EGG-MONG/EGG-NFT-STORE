import Link from "next/link";
import Search from "./Search";
import Paging from "./Paging";
import styles from "../../styles/list.module.css";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";

const List = () => {
  // 페이지 네이션
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // data 불러오기
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
      <div className={styles.searchArea}>
        <Search />
      </div>
      <div className={styles.listArea}>
        <div className={styles.itemsArea}>
          {items.slice(offset, offset + limit).map(({ id, title }) => (
            <Card
              key={id}
              style={{
                width: 250,
              }}
              cover={<img alt="example" src="/Img/example.jpg" />}
            >
              <div>
                <div className={styles.itemTitle}>
                  <Link href="/detail">{title}</Link>
                </div>
                <div>{id}ETH</div>
                <div className={styles.btnArea}>
                  <Button
                    style={{
                      width: 150,
                    }}
                  >
                    cart
                  </Button>
                  <Button
                    style={{
                      width: 150,
                    }}
                  >
                    buy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Paging
        total={items.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default List;
