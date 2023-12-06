import { useState } from 'react'
import style from './ProfileDetails.module.scss'

export default function ProfileAddress() {
  const [address, setAddress] = useState({
    tinh: 'TP. Cần Thơ',
    huyen: 'Ninh Kiều',
    xa: 'An Phú',
    locate: 'Hẻm 2B đường Nguyễn Việt Hồng',
  })

  const handleChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className={`${style.wrapper} container-fluild`}>
        <div className={style.accountDetail}>
          <div>Địa chỉ của tôi</div>
          <p>Mặc định</p>
        </div>
        <div className="mt-3 col-md-7 col-12 offset-md-2">
          <form>
            <table className={style.profileDetails}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="tinh">Tỉnh/Thành phố</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={handleChangeAddress}
                      value={address.tinh}
                      name="tinh"
                      className="form-control"
                      id="tinh"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="huyen">Quận/Huyện</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={handleChangeAddress}
                      value={address.huyen}
                      name="huyen"
                      className="form-control"
                      id="huyen"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="xa">Phường/Xã</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={handleChangeAddress}
                      value={address.xa}
                      name="xa"
                      className="form-control"
                      id="xa"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="address">Địa chỉ cụ thể</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={handleChangeAddress}
                      value={address.locate}
                      name="locate"
                      className="form-control"
                      id="address"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button type="button" className="btn btn-primary mb-3">
                      Lưu
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  )
}
