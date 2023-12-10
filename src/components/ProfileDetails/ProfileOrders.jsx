import { Link, useLocation } from 'react-router-dom'

import style from './ProfileDetails.module.scss'
import { useEffect, useState } from 'react'
import UserService from '../../services/user-service'
import { formatter } from '../../services/general'
import Loading from '../Loading/Loading'
import notificationService from '../../services/notificationService'
import Success from '../../components/Success/Success'

export default function ProfileOrderLists() {
  const { state } = useLocation()
  const [success, setSuccess] = useState(state === null ? false : state.successOrder)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    UserService.getAllOrder()
      .then((response) => {
        setOrders(response.data)
        setLoading(false)
      })
      .catch(() => {
        setOrders([])
        setLoading(false)
      })
  }, [])

  const handleCancelOrder = (id) => {
    UserService.updateOrder({
      id: id,
      action: 'cancel',
    })
      .then(() => {
        const newOrders = []
        orders.forEach((item) => {
          if (item.id === id) {
            item = {
              ...item,
              status: 'CANCELLED',
            }
          }
          newOrders.push(item)
        })
        setOrders([...newOrders])
        notificationService.Success('Hủy đơn hàng thành công')
      })
      .catch(() => notificationService.Danger('Không thể hủy đơn hàng'))
  }

  const generalStatus = (status) => {
    switch (status) {
      case 'CANCELLED':
        return <td className="text-warning">Đơn hàng đã bị hủy</td>
      case 'PROCESSING':
        return <td className="text-secondary">Đơn hàng đang được xử lý</td>
      case 'SHIPPING':
        return <td className="text-primary">Đơn hàng đang được vận chuyển</td>
      case 'DELIVERED':
        return <td className="text-success">Đơn hàng đã giao thành công</td>
      default:
        return <td className="text-secondary">Đơn hàng đang được xử lý</td>
    }
  }

  const handleReceiveOrder = (id) => {
    UserService.updateOrder({
      id: id,
      action: 'receive',
    })
      .then(() => {
        const newOrders = []
        orders.forEach((item) => {
          if (item.id === id) {
            item = {
              ...item,
              status: 'DELIVERED',
            }
          }
          newOrders.push(item)
        })
        setOrders([...newOrders])
        notificationService.Success('Cập nhật trạng thái thành công')
      })
      .catch(() => notificationService.Danger('Không cập nhật trạng thái'))
  }

  const hideSuccess = () => {
    setTimeout(() => {
      setSuccess(false)
    }, 1500)
  }

  useEffect(() => {
    hideSuccess()
  }, [])

  if (loading) {
    return <Loading />
  } else if (orders.length === 0) {
    return (
      <>
        <div className={`${style.wrapper} container-fluild`}>
          <div className={style.accountDetail}>
            <div>Quản lý đơn hàng</div>
            <p>Đơn hàng của tôi</p>
          </div>
          <div className="text-center my-5">
            <h3>Bạn chưa có đơn hàng nào</h3>
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
        {success && <Success />}
        <div className={`${style.wrapper} container-fluild`}>
          <div className={style.accountDetail}>
            <div>Quản lý đơn hàng</div>
            <p>Đơn hàng của tôi</p>
          </div>
          <div className="table-responsive mt-3">
            <table className={`${style.listOrder} table`}>
              <thead>
                <tr>
                  <td>Mã đơn hàng</td>
                  <td>Ngày đặt hàng</td>
                  <td>Tổng tiền (đ)</td>
                  <td colSpan={2}>Trạng thái</td>
                </tr>
                {orders.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={`${item.id}`}>{item.id}</Link>
                      </td>
                      <td>{item.orderTime}</td>
                      <td>{formatter.format(item.total)}</td>
                      {generalStatus(item.status)}
                      <td>
                        {item.status === 'PROCESSING' ? (
                          <button className="btn btn-primary" onClick={() => handleCancelOrder(item.id)}>
                            Hủy đơn
                          </button>
                        ) : (
                          ''
                        )}
                        {item.status === 'SHIPPING' ? (
                          <button className="btn btn-primary" onClick={() => handleReceiveOrder(item.id)}>
                            Đã nhận hàng
                          </button>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  )
                })}
              </thead>
            </table>
          </div>
        </div>
      </>
    )
  }
}
