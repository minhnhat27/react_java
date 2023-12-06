import { Link } from 'react-router-dom'

import style from './ProfileDetails.module.scss'

export default function ProfileOrderLists() {
  return (
    <>
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
                <td>Ngày mua</td>
                <td>Sản phẩm</td>
                <td>Tổng tiền (đ)</td>
                <td>Trạng thái</td>
              </tr>
              <tr>
                <td>
                  <Link to="/orders/:id">12321312</Link>
                </td>
                <td>01/08/2022</td>
                <td>Laptop ...</td>
                <td>20.000.000</td>
                <td>Đã giao hàng</td>
              </tr>
              <tr>
                <td>
                  <Link to="/orders/:id">12324123</Link>
                </td>
                <td>12/12/2022</td>
                <td>RAM 8GB ...</td>
                <td>800.000</td>
                <td>Đã hủy</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  )
}
