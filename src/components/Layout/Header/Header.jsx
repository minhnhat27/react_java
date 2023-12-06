import { Link } from 'react-router-dom'
import { useAuth } from '../../../App'
import AuthService from '../../../services/auth-service'
import actions from '../../../services/authAction'

export default function Header() {
  const { state, dispath } = useAuth()

  const handleLogout = () => {
    AuthService.logout()
    dispath(actions.actionLogout)
  }

  return (
    <div className="navbar navbar-expand-lg bd-navbar sticky-top bg-body-secondary">
      <h2>Header</h2>
      <Link className="mx-2" to="/">
        Trang chủ
      </Link>
      <Link className="mx-2" to="/products">
        Sản phẩm
      </Link>
      <Link className="mx-2" to="/profile">
        Trang cá nhân
      </Link>
      {state.isAuthenticated ? (
        <Link className="mx-2" onClick={handleLogout} to="/login">
          Đăng xuất
        </Link>
      ) : (
        <Link className="mx-2" to="/login">
          Đăng nhập
        </Link>
      )}
    </div>
  )
}
