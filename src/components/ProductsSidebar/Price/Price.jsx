import { useState } from 'react'
import style from './Price.module.scss'
import styleContainer from '../Sidebar.module.scss'
import { Value } from '../../UI/Value'

export const Price = ({ handleChange }) => {
  const [value, setValue] = useState(0)
  const isExpensive = value >= 10000000 ? style.high : style.low

  const changeCurrency = (e) => {
    setValue(e.target.value)
    handleChange(e)
  }

  return (
    <div className="">
      <h4 className={styleContainer.sidebarTitle}>Giá</h4>
      <div className={style.ml}>
        <label className={style.sidebarLabelContainer}>
          <Value value={value} />
          <div className={style.priceSliderContainer}>
            <input
              className={`${style.priceSlider} ${isExpensive}`}
              type="range"
              min="500000"
              max="20000000"
              step="500000"
              value={value}
              name="price"
              onChange={(e) => changeCurrency(e)}
            />
          </div>
        </label>
      </div>
    </div>
  )
}
