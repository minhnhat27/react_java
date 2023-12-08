import { formatter } from '../../services/general'
import stypePrice from '../ProductsSidebar/Price/Price.module.scss'

export const Value = ({ value }) => {
  const isDisplay = value > 0 ? stypePrice.show : stypePrice.hide
  let price = (
    <>
      {/* <NumericFormat className="price-value" type="text" value={value} thousandSeparator="," /> */}
      <span className={stypePrice.priceValue}>{formatter.format(value)}</span>
    </>
  )

  return <label className={`${stypePrice.priceValueWrapper} ${isDisplay}`}>{price}</label>
}
