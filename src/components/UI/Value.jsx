import stypePrice from '../ProductsSidebar/Price/Price.module.scss'
// import { NumericFormat } from 'react-number-format'
export const Value = ({ value }) => {
  const formatter = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' })

  const isDisplay = value > 0 ? stypePrice.show : stypePrice.hide
  let price = (
    <>
      {/* <NumericFormat className="price-value" type="text" value={value} thousandSeparator="," /> */}
      <span className={stypePrice.priceValue}>{formatter.format(value)}</span>
    </>
  )

  return <label className={`${stypePrice.priceValueWrapper} ${isDisplay}`}>{price}</label>
}
