import style from './Recommended.module.scss'
import { Buttons } from '../../UI/Buttons'

export const Recommended = ({ handleClick }) => {
  return (
    <>
      <p className={style.recommendedTitle}>Những loại sản phẩm bạn có thể thích:</p>
      <div className={style.recommendedFlex}>
        <button onClick={handleClick} value="" title="Tất cả sản phẩm">
          Tất cả sản phẩm
        </button>
        <Buttons onClickHandler={handleClick} value="Máy Tính" title="Laptop"></Buttons>
        <Buttons onClickHandler={handleClick} value="Desktop" title="Desktop"></Buttons>
        <Buttons onClickHandler={handleClick} value="Điện Thoại" title="Điện thoại"></Buttons>
        <Buttons onClickHandler={handleClick} value="Phụ kiện chung" title="Phụ kiện chung"></Buttons>
      </div>
    </>
  )
}
