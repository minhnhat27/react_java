import { AddItem } from '../../../services/general'
import style from '../Sidebar.module.scss'

export const Category = ({ handleChange, products }) => {
  return (
    <div className={style.sidebarContainer}>
      <h2 className={style.sidebarTitle}>Loại sản phẩm</h2>
      <label className={style.sidebarLabelContainer}>
        <input type="radio" value="" name="category" onChange={(e) => handleChange(e, 'category')} />
        <span className={style.checkmark}></span>Tất cả
      </label>
      {AddItem('category', handleChange, products)}
    </div>
  )
}
