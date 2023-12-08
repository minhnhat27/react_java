import { AddItem } from '../../../services/general'
import { Input } from '../../UI/Input'
import style from '../Sidebar.module.scss'

export const Brand = ({ handleChange, products }) => {
  const brands = []
  for (let i = 0; i < 5; i++) {
    brands.push(<Input />)
  }
  return (
    <div className={style.sidebarContainer}>
      <h2 className={style.sidebarTitle}>Thương hiệu</h2>
      <div>
        <label className={style.sidebarLabelContainer}>
          <input type="radio" value="" name="brand" onChange={(e) => handleChange(e, 'brand')} />
          <span className={style.checkmark}></span>Tất cả
        </label>
        {AddItem('brand', handleChange, products)}
      </div>
    </div>
  )
}
