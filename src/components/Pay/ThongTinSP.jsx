import { formatter } from '../../services/general'
import { Image } from '../UI/Image'

export default function ThongTinSP({ state }) {
  return (
    <>
      <div>
        <h3>Thông tin sản phẩm</h3>
        <ul className="list-group">
          {state.products.map((item) => {
            return (
              <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                <Image img={item.img} folder="products" width={100} height={100} />
                {item.name}
                <span className="badge bg-primary">{item.quantity}</span>
              </li>
            )
          })}
        </ul>
        <table className="w-100">
          <tbody>
            <tr>
              <td>Tổng tiền</td>
              <td className="text-end">{formatter.format(state.total)}</td>
            </tr>
            <tr>
              <td>Khuyến mãi</td>
              <td className="text-end">{formatter.format(state.discount)}</td>
            </tr>
            <tr>
              <td>Phí vận chuyển</td>
              <td className="text-end">Miễn phí</td>
            </tr>
            <tr>
              <td>Thành tiền</td>
              <td className="text-end fw-bold">{formatter.format(state.total - state.discount)}</td>
            </tr>
            <tr>
              <td colSpan="2" className="text-end fst-italic text-danger">
                (Đã bao gồm VAT)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
