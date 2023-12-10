import { FaHeart } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { HiUserAdd } from 'react-icons/hi'
import style from './Search.module.scss'

export const Search = ({ query, handleInputChange }) => {
  return (
    <nav className={style.nav}>
      <input
        type="text"
        className={`${style.searchInput} ${style.searchLarge}`}
        placeholder="🔎 Điền tên mặt hàng bạn muốn tìm vào đây ^ ^"
        onChange={handleInputChange}
        value={query}
      />
      <input
        type="text"
        className={`${style.searchInput} ${style.searchSmall}`}
        placeholder="🔎 Tìm hàng ở đây ^ ^"
        onChange={handleInputChange}
        value={query}
      />
    </nav>
  )
}
