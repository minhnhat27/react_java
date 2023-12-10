import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Styles from './ProductDetails.module.scss'
import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import PublicService from '../../services/public-service'
import { Image } from '../../components/UI/Image'
import { formatter } from '../../services/general'
import UserService from '../../services/user-service'
import notificationService from '../../services/notificationService'
import { useAuth } from '../../App'
const cx = classNames.bind(Styles)

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useAuth()

  const [product, setProduct] = useState(null)
  useEffect(() => {
    PublicService.getProduct(id)
      .then((response) => setProduct(response.data))
      .catch((error) => error)
  }, [])

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
    <>
      <div className={cx('container mt-5 mb-5')}>
        <div className={cx('title')}>
          <h2> CHI TIẾT SẢN PHẨM</h2>
        </div>
        {product && (
          <div className={cx('row')}>
            <div className={cx('col-md-3')}>
              <Image img={product.mainImage} folder="products" alt="Product" className={cx('img-fluid')} />
            </div>
            <div className={cx('col-md-3')}>
              <h2 className={cx('mb-3')}>{product.name}</h2>
              <p className={cx('lead')}>Danh muc: {product.category} </p>
              <p className={cx('lead')}>Thương hiệu: {product.brand} </p>
              <h3 className="text-decoration-line-through">{formatter.format(product.price)}</h3>
              <h3 className={cx('text-primary')}>
                {formatter.format(product.price - (product.price * product.discountPercent) / 100)}
              </h3>
              <button onClick={() => handleAddToCart(product.id)} className={cx('btn btn-primary')}>
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
