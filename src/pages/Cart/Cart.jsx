import style from './Cart.module.scss'
import CartList from '../../components/CartList/CartList'
import PayOverview from '../../components/CartList/PayOverview/PayOverview'
// import { cartItems } from '../../db/data'
import { useEffect, useState } from 'react'
import UserService from '../../services/user-service'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [total, setTotal] = useState(0)
  const [discount, setDisCount] = useState(0)
  const [checkout, setCheckout] = useState([])

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    UserService.getCart().then((response) => {
      setCartItems(response.data)
    })
  }, [])

  if (cartItems.length === 0) {
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
        <div className={`${style.bgCart} container-fluid`}>
          <div className="row">
            <div className="col-lg-8">
              <CartList
                cartItems={cartItems}
                setCartItems={setCartItems}
                Total={setTotal}
                Discount={setDisCount}
                Checkout={setCheckout}
              />
            </div>
            <div className="col-lg-4">
              <PayOverview total={total} discount={discount} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
