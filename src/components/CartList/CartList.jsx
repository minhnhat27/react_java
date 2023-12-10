import style from './CartList.module.scss'
import { Image } from '../UI/Image'
import { formatter } from '../../services/general'
import { useEffect, useState } from 'react'
import UserService from '../../services/user-service'
import notificationService from '../../services/notificationService'

export default function CartList({ cartItems, setCartItems, products, setProducts, Total, Discount }) {
  const [checkAll, setCheckAll] = useState(false)
  // const [quantity, setQuantity] = useState()

  const handleSelectItems = (items) => {
    setProducts((preItems) => {
      if (products.includes(items)) {
        return products.filter((item) => item.id !== items.id)
      } else {
        return [...preItems, items]
      }
    })
  }

  useEffect(() => {
    var dis = 0
    var tol = 0
    products.forEach((value) => {
      tol += value.price * value.quantity
      dis += ((value.price * value.discountPercent) / 100) * value.quantity
    })
    Total(tol)
    Discount(dis)
    if (products.length === 0) {
      setCheckAll(false)
    }
    if (products.length === cartItems.length) {
      setCheckAll(true)
    }
  }, [products])

  const handleSelectAll = () => {
    if (!checkAll) {
      setProducts([...cartItems])
      setCheckAll(!checkAll)
    } else {
      setProducts([])
      setCheckAll(!checkAll)
    }
  }

  const handleChangeQuantity = (id, value) => {
    const data = {
      productId: id,
      quantity: value,
    }
    const product = cartItems.find((item) => item.productId === id)
    if (!product || (product.quantity === 1 && value === -1)) {
      return
    }

    UserService.addToCart(data)
      .then(() => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.productId === id) {
            return {
              ...item,
              quantity: item.quantity + value,
            }
          }
          return item
        })

        setCartItems(updatedCartItems)
        notificationService.Success('Cập nhật sản phẩm thành công')
      })
      .catch(() => notificationService.Danger('Cập nhật sản phẩm thất bại'))
  }

  const handleDeleteProduct = (productId) => {
    UserService.deleteCart({ productId: productId })
      .then(() => {
        const updatedCartItems = cartItems.filter((e) => e.productId !== productId)
        setCartItems(updatedCartItems)
        notificationService.Success('Xóa sản phẩm thành công')
      })
      .catch(() => notificationService.Danger('Xóa sản phẩm thất bại'))
  }

  const handleDeleteCart = () => {
    UserService.deleteAllCart()
      .then(() => {
        setCartItems([])
        notificationService.Success('Đã xóa tất cả sản phẩm khỏi giỏ hàng')
      })
      .catch(() => notificationService.Danger('Xóa giỏ hàng thất bại'))
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="text-danger fs-4">Giỏ hàng</h4>
        <button onClick={() => handleDeleteCart()} className="btn text-primary border-0 p-0">
          Xóa tất cả
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table text-center align-middle">
              <thead>
                <tr className="fw-bold">
                  <td>
                    <input type="checkbox" checked={checkAll} onChange={handleSelectAll} />
                  </td>
                  <td>Sản phẩm</td>
                  <td>Đơn giá</td>
                  <td>Số lượng</td>
                  <td>Thành tiền</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((value, i) => {
                  const dis = (value.price * value.discountPercent) / 100
                  const tol = (value.price - dis) * value.quantity
                  return (
                    <tr key={i}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          checked={products.includes(value)}
                          onChange={() => handleSelectItems(value)}
                        />
                      </td>
                      <td>
                        <Image img={value.img} folder="products" width={100} height={100} />
                        <div>{value.name}</div>
                      </td>
                      <td>
                        <div className="text-decoration-line-through">{formatter.format(value.price)}</div>
                        <div>{formatter.format(value.price - dis)}</div>
                      </td>
                      <td>
                        <div className="input-group d-flex justify-content-center">
                          <button
                            onClick={() => handleChangeQuantity(value.productId, -1)}
                            type="button"
                            className="btn btn-outline-secondary border-1 rounded-start-1"
                          >
                            -
                          </button>
                          <input readOnly type="text" className={`${style.inputQuantity}`} value={value.quantity} />
                          <button
                            onClick={() => handleChangeQuantity(value.productId, 1)}
                            type="button"
                            className="btn btn-outline-secondary border-1 rounded-end-1"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(value.productId)}
                          className="btn text-primary border-0 p-0 mt-3"
                        >
                          Xóa
                        </button>
                      </td>
                      <td>{formatter.format(tol)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
