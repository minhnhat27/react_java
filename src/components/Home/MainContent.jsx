import React, { useEffect, useState } from 'react'
import { FaLink, FaShoppingCart } from 'react-icons/fa'
import PublicService from '../../services/public-service'
import { formatter } from '../../services/general'
import { useAuth } from '../../App'
import { useNavigate, Link } from 'react-router-dom'
import notificationService from '../../services/notificationService'
import UserService from '../../services/user-service'
import { Image } from '../UI/Image'

const MainContent = () => {
  const [products, setProducts] = useState([])
  const { state } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    PublicService.getTopProducts()
      .then((response) => {
        const data = response.data
        setProducts(data)
      })
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
    <div className="row mt-5 mb-5">
      <h2 className="text-center mb-3">CÁC SẢN PHẨM NỔI BẬT</h2>
      {products.map((item, i) => {
        return (
          <div key={i} className="col-md-3 mb-4">
            <div className="card">
              <Image img={item.mainImage} folder="products" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="product-carousel-price">
                  <ins className="text-success font-weight-bold" style={{ fontSize: '20px', marginRight: '10px' }}>
                    {formatter.format(item.price - (item.price * item.discountPercent) / 100)}
                  </ins>
                  <del className="text-muted" style={{ fontSize: '20px' }}>
                    {formatter.format(item.price)}
                  </del>
                </div>

                <div className="product-hover">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="btn btn-primary "
                    style={{ marginRight: '10px' }}
                  >
                    <FaShoppingCart /> Add to cart
                  </button>
                  <Link className="mt-2 btn btn-secondary" to={`/product/${item.id}`}>
                    <FaLink /> See details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MainContent
