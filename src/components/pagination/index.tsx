import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage?: number;
  onChangePage: (page: number) => void;
}

 const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
  return (
    <div>
           <ReactPaginate
        className={styles.root}
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected+1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination