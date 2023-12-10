import logo from '../../logo.svg'
import { FaUser, FaListAlt } from 'react-icons/fa'

import style from './Profile.module.scss'
import { Link, useLocation } from 'react-router-dom'
import AuthService from '../../services/auth-service'

export default function Profile({ children }) {
  const { pathname } = useLocation()
  const currentUser = AuthService.getCurrentUser()

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-2 col-12">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img id={style.userProfileImg} src={logo} alt="" />
            <div>
              <div className={style.userName}>{currentUser.email}</div>
              <Link to="/profile/details" className={style.editProfile}>
                Sửa Hồ Sơ
              </Link>
            </div>
          </div>
          <hr />
          <div className={`${style.sidebar} d-flex flex-row justify-content-between flex-md-column`}>
            <div className={pathname === '/profile/details' || pathname === '/profile' ? style.selected : ''}>
              <Link to="/profile/details">
                <FaUser />
                <div>Thông tin tài khoản</div>
              </Link>
            </div>
            <div className={pathname === '/profile/orders' ? style.selected : ''}>
              <Link to="/profile/orders">
                <FaListAlt />
                <div>Quản lý đơn hàng</div>
              </Link>
            </div>
            {/* <div className={pathname === '/profile/address' ? style.selected : ''}>
              <Link to="/profile/address">
                <FaMap />
                <div>Địa chỉ</div>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="col-md-10 col-12">{children}</div>
      </div>
    </div>
  )
}
