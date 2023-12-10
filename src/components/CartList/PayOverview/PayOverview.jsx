import { formatter } from '../../../services/general'
import { Link, useNavigate } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function PayOverview({ products, total, discount, handeCheckout }) {
  const navigate = useNavigate()
  const handleCheckout = () => {
    navigate('/pay', { state: { products: products, total: total, discount: discount } })
  }

  return (
    <>
      <h4 className="text-danger fs-4">Thông tin thanh toán</h4>
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
                <td colSpan="2">
                  <button
                    disabled={products.length === 0 ? 'disabled' : ''}
                    className="btn btn-primary w-100 mt-4"
                    onClick={handleCheckout}
                  >
                    Thanh toán ngay
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
