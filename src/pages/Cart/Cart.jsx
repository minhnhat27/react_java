import style from './Cart.module.scss'
import CartList from '../../components/CartList/CartList'
import PayOverview from '../../components/CartList/PayOverview/PayOverview'
import UserService from '../../services/user-service'
import Loading from '../../components/Loading/Loading'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [total, setTotal] = useState(0)
  const [discount, setDisCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    UserService.getCart()
      .then((response) => {
        setCartItems(response.data)
        setLoading(false)
      })
      .catch(() => {
        setCartItems([])
        setLoading(false)
      })
  }, [])

  const handleCheckout = () => {}

  if (loading) {
    return <Loading />
  } else if (cartItems.length === 0) {
    return (
      <>
        <div className="container-fluid">
          <div className="text-center my-5">
            <h3>Giỏ hàng chưa có sản phẩm nào</h3>
            <Link type="button" className="btn btn-primary m-3 text-white" to="/products">
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={`${style.bgCart} container-fluid h-100`}>
          <div className="row">
            <div className="col-lg-8">
              <CartList
                cartItems={cartItems}
                setCartItems={setCartItems}
                products={products}
                setProducts={setProducts}
                Total={setTotal}
                Discount={setDisCount}
              />
            </div>
            <div className="col-lg-4">
              <PayOverview products={products} total={total} discount={discount} handleCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
