import { useEffect, useState } from 'react'
import style from './Sort.module.scss'
import Pagination from '../Paginate/Paginate'

export default function Sort({ result }) {
  const [resultSort, setResultSort] = useState([])

  useEffect(() => {
    setResultSort([...result])
  }, [result])

  const handleSortChange = (e) => {
    const val = e.target.value
    let sortItem = [...resultSort]

    if (val === '2') {
      sortItem.sort((a, b) => a.props.children.props.newPrice - b.props.children.props.newPrice)
      setResultSort([...sortItem])
    } else if (val === '3') {
      sortItem.sort((b, a) => a.props.children.props.newPrice - b.props.children.props.newPrice)
      setResultSort([...sortItem])
    } else {
      setResultSort([...result])
    }
  }

  return (
    <>
      <div className={`${style.sort} d-flex justify-content-end`}>
        <select onChange={handleSortChange} defaultValue="1">
          <option value="1">Mặc định</option>
          <option value="2">Giá thấp đến cao</option>
          <option value="3">Giá cao đến thấp</option>
        </select>
      </div>
      <Pagination data={resultSort} itemsPerPage={9} />
    </>
  )
}
