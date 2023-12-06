import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import style from './Paginate.module.scss'
import { ProductsCard } from '../ProductsCard'

export default function Pagination({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(0)

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected)
  }

  const offset = currentPage * itemsPerPage
  const pageCount = Math.ceil(data.length / itemsPerPage)
  const currentPageData = data.slice(offset, offset + itemsPerPage)

  return (
    <div>
      {<ProductsCard result={currentPageData} />}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName={style.pagination}
        activeClassName={style.active}
        disabledClassName={style.disable}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
