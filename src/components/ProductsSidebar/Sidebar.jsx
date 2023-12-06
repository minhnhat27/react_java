import { Category } from './Category/Category'
import { Price } from './Price/Price'
import { Brand } from './Brand/Brand'
import style from './Sidebar.module.scss'

export const Sidebar = ({ handleChange, products }) => {
  return (
    <section className={style.sidebar}>
      {/* <div id="yin-yang"></div> */}
      <Category handleChange={handleChange} products={products} />
      <Price handleChange={handleChange} products={products} />
      <Brand handleChange={handleChange} products={products} />
    </section>
  )
}
