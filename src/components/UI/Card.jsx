import { BsFillBagHeartFill } from 'react-icons/bs'
import { Value } from './Value'
import { Image } from './Image'
import style from '../ProductsCard/ProductsCard.module.scss'

export const Card = ({ img, title, star, prevPrice, newPrice }) => {
  return (
    <section className={style.card}>
      <Image img={img} title={title} />
      <div className={style.cardDetails}>
        <h5 className={style.cardTitle}>{title}</h5>
        <section className={style.cardReviews}>
          <div className={style.ratingStars}>
            {star}
            {star}
            {star}
            {star}
          </div>
          <span className={style.totalReviews}>(100 đánh giá)</span>
        </section>
        <section className={style.cardPrice}>
          <div className={style.price}>
            <span>
              <Value value={prevPrice} />
            </span>{' '}
            <Value value={newPrice} />
          </div>
          <div className={style.bag}>
            <BsFillBagHeartFill />
          </div>
        </section>
      </div>
    </section>
  )
}
