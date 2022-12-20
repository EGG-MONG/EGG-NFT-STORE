import React from "react";
import styles from "../../styles/paging.module.css";

const Paging = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <div className={styles.pagingArea}>
      <button className={styles.btnStyle} onClick={() => setPage((page = 1))} disabled={page === 1}>
        &lt;&lt;
      </button>
      <button className={styles.btnStyle} onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button className={styles.btnStyle}
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button className={styles.btnStyle} onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
      <button className={styles.btnStyle} onClick={() => setPage(numPages)} disabled={page === numPages}>
        &gt; &gt;
      </button>
    </div>
  );
};

export default Paging;
