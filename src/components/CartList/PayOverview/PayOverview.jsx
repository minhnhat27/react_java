import { useState } from 'react'
import { formatter } from '../../../services/general'
import { Image } from '../../UI/Image'
import style from './PayOverview.module.scss'

export default function PayOverview({ total, discount }) {
  const [vnPayMethod, setVnPayMethod] = useState(false)

  const handleSelectPayMethod = (value) => {
    setVnPayMethod(value)
  }

  return (
    <>
      <h4 className="text-danger fs-4">Thanh toán</h4>
      <div className="card">
        <div className="card-body">
          <table className="w-100">
            <tbody>
              <tr>
                <td>Tổng tiền</td>
                <td className="text-end">{formatter.format(total)}</td>
              </tr>
              <tr>
                <td>Khuyến mãi</td>
                <td className="text-end">{formatter.format(discount)}</td>
              </tr>
              <tr>
                <td>Thành tiền</td>
                <td className="text-end fw-bold">{formatter.format(total - discount)}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-end fst-italic text-danger">
                  (Đã bao gồm VAT)
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="fw-bold">
                  Thông tin nhận hàng
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="my-2">
                    <input readOnly type="text" className="form-control" value="Minh Nhật" />
                    <input readOnly type="text" className="form-control my-1" value="0358103707" />
                    <input readOnly type="text" className="form-control" value="An Phú, Ninh Kiều, TP.Cần Thơ" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="fw-bold">
                  <div className="mb-2">Phương phức thanh toán</div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="row">
                    <div className="col-6 p-1">
                      <div
                        className={`${vnPayMethod || style.selected} ${style.method} card h-100`}
                        onClick={() => handleSelectPayMethod(false)}
                      >
                        <div className="card-body d-flex justify-content-center align-items-center">
                          Thanh toán khi nhận hàng
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-1">
                      <div
                        className={`${vnPayMethod && style.selected} ${style.method} card`}
                        onClick={() => handleSelectPayMethod(true)}
                      >
                        <div className="card-body p-0 d-flex justify-content-center">
                          <Image img="vnpay.png" width={100} height={80} draggable={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="btn btn-primary w-100 mt-4">Thanh toán</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
