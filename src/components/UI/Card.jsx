import { BsFillCartPlusFill } from 'react-icons/bs'
import { Value } from './Value'
import { Image } from './Image'
import style from '../ProductsCard/ProductsCard.module.scss'
import UserService from '../../services/user-service'
import notificationService from '../../services/notificationService'
import { useAuth } from '../../App'
import { Link, useNavigate } from 'react-router-dom'

export const Card = ({ id, img, title, star, prevPrice, newPrice }) => {
  const { state } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = (id) => {
    if (state.isAuthenticated) {
      const data = {
        productId: id,
        quantity: 1,
      }
      UserService.addToCart(data).then(
        () => {
          notificationService.Success('Thêm vào giỏ hàng thành công')
        },
        () => {
          notificationService.Danger('Thêm vào giỏ hàng thất bại')
        },
      )
    } else {
      navigate('/login')
      notificationService.Warning('Vui lòng đăng nhập')
    }
  }

  return (
    <section className={style.card}>
      <Link to={`/product/${id}`}>
        <Image img={img} folder="products" title={title} className={style.cardImg} />
      </Link>
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
            </span>
            <Value value={newPrice} />
          </div>
          <div className={style.bag} onClick={() => handleAddToCart(id)} title="Thêm vào giỏ hàng">
            <BsFillCartPlusFill />
          </div>
        </section>
      </div>
    </section>
  )
}
