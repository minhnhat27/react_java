import logo from '../../logo.svg'
import React, { useEffect, useState } from 'react'
import { FaUser, FaListAlt, FaMap } from 'react-icons/fa'

import style from './Profile.module.scss'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth-service'
import ProfileService from '../../services/profile-service'
import notificationService from '../../services/notificationService'
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails'
import ProfileOrderLists from '../../components/ProfileDetails/ProfileOrders'
import ProfileAddress from '../../components/ProfileDetails/ProfileAddress'

export default function Profile() {
  const currentUser = AuthService.getCurrentUser()
  const [user, setUser] = useState({
    picture: logo,
    username: '',
    lastname: '',
    firstname: '',
    email: '',
    birthday: '',
    sex: -1,
  })

  const [nav, setNav] = useState(1)
  const [child, setChild] = useState()
  const handleClickNav = (value) => {
    setNav(value)
    switch (value) {
      case 1:
        setChild(<ProfileDetails user={user} setUser={setUser} />)
        break
      case 2:
        setChild(<ProfileOrderLists />)
        break
      case 3:
        setChild(<ProfileAddress />)
        break
      default:
        setChild(<ProfileDetails user={user} />)
    }
  }
  useEffect(() => {
    ProfileService.getProfile()
      .then((response) => {
        const updatedData = {}
        for (let key in response.data) {
          if (response.data[key] === null) {
            updatedData[key] = ''
          } else {
            updatedData[key] = response.data[key]
            if (key === 'birthday') {
              updatedData[key] = response.data[key].substring(0, 10)
            }
          }
        }
        setUser(updatedData)
        setChild(<ProfileDetails user={updatedData} setUser={setUser} />)
      })
      .catch(() => {
        // navigate('/home');
        setChild(<ProfileDetails user={user} setUser={setUser} />)
        notificationService.Warning('Có lỗi xảy ra. Không thể lấy thông tin người dùng')
      })
  }, [])

  const limitText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text
  }

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-2 col-12">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img id={style.userProfileImg} src={logo} alt="" />
            <div>
              <div className="fw-medium">{limitText(user.email, 14)}</div>
              <Link to="/profile/details" className={style.editProfile}>
                Sửa Hồ Sơ
              </Link>
            </div>
          </div>
          <hr />
          <div className={`${style.sidebar} d-flex flex-row justify-content-between flex-md-column`}>
            <div className={nav === 1 ? style.selected : ''} onClick={() => handleClickNav(1)}>
              <Link to="/profile/details">
                <FaUser />
                <div>Thông tin tài khoản</div>
              </Link>
            </div>
            <div className={nav === 2 ? style.selected : ''} onClick={() => handleClickNav(2)}>
              <Link to="/profile/orders">
                <FaListAlt />
                <div>Quản lý đơn hàng</div>
              </Link>
            </div>
            <div className={nav === 3 ? style.selected : ''} onClick={() => handleClickNav(3)}>
              <Link to="/profile/address">
                <FaMap />
                <div>Địa chỉ</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-12">{child}</div>
      </div>
    </div>
  )
}
