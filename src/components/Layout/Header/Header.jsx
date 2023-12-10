import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.js'

import { useAuth } from '../../../App'
import AuthService from '../../../services/auth-service'
import actions from '../../../services/authAction'
import ImgLogo from '../../../assets/img'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { BsCart3 } from 'react-icons/bs'
import notificationService from '../../../services/notificationService'

const cx = classNames.bind(styles)

export default function Header() {
  const { state, dispatch } = useAuth()

  const handleLogout = () => {
    AuthService.logout()
    dispatch(actions.actionLogout)
    notificationService.Info('Đã đăng xuất')
  }

  return (
    <nav className={cx('sticky-top navbar navbar-expand-lg bg-body-tertiary')}>
      <div className={cx('container-lg container-fluid')}>
        <Link className={cx('navbar-brand')} to="/">
          <img src={ImgLogo.logo} alt="Logo" className={cx('each-slide-effect')} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={cx('collapse', 'navbar-collapse')} id="navbarNav">
          <ul className={cx('navbar-nav')}>
            <li className={cx('nav-item')}>
              <Link className={cx('nav-link')} to="/">
                Trang chủ
              </Link>
            </li>
            <li className={cx('nav-item')}>
              <Link className={cx('nav-link')} to="/products">
                Sản Phẩm
              </Link>
            </li>
            {state.isAuthenticated && (
              <li className={cx('nav-item')}>
                <Link className={cx('nav-link')} to="/profile">
                  Hồ Sơ
                </Link>
              </li>
            )}
            <li className={cx('nav-item')}>
              {state.isAuthenticated ? (
                <Link className={cx('nav-link')} onClick={handleLogout} to="/login">
                  Đăng Xuất
                </Link>
              ) : (
                <Link className={cx('nav-link')} to="/login">
                  Đăng Nhập
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <BsCart3 style={{ fontSize: 30, color: 'rgb(70, 0, 250)' }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
