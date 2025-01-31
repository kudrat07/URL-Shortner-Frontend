import React, { useState } from "react";
import styles from "./pagination.module.css";

const Pagination = ({ totalPage, postPerPage, setCurrentPage }) => {
  const pages = Array.from(
    { length: Math.ceil(totalPage / postPerPage) },
    (_, i) => i + 1
  );

  const [current, setCurrent] = useState(pages[0] || 1);

  const handlePrev = () => {
    if (current > 1) {
      setCurrent((prev) => prev - 1);
      setCurrentPage(current - 1);
    }
  };

  const handleNext = () => {
    if (current < pages.length) {
      setCurrent((prev) => prev + 1);
      setCurrentPage(current + 1);
    }
  };

  return (
    <div className={styles.btnWrapper}>
      <button
        className={`${styles.prevBtn} ${current === 1 ? styles.disabled : ""}`}
        onClick={handlePrev}
        disabled={current === 1}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrent(page);
            setCurrentPage(page);
          }}
          className={`${styles.btn} ${current === page ? styles.active : ""}`}
        >
          {page}
        </button>
      ))}
      <button
        className={`${styles.nextBtn} ${current === pages.length ? styles.disabled : ""}`}
        onClick={handleNext}
        disabled={current === pages.length}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
