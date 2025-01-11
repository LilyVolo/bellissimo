import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage?: number;
  categoryId: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, categoryId }) => {
  useEffect(() => {
    if (categoryId !== 0) {
      onChangePage(1); 
    }
  }, [categoryId, onChangePage]);

  return (
    categoryId === 0 && (
      <div>
        <ReactPaginate
          className={styles.root}
          nextLabel=">"
          onPageChange={(e) => onChangePage(e.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={2}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPage ? currentPage - 1 : 0}
        />
      </div>
    )
  );
};

export default Pagination;
