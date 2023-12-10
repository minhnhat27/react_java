import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/auth-service'
import logo from '../../logo.svg'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import notificationService from '../../services/notificationService'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError,
  } = useForm()

  const handleSumitRegister = () => {
    setLoading(true)

    const formData = {
      email: watch('email'),
      phone: watch('phone'),
      firstname: watch('name', ''),
      password: watch('confirmPassword'),
      url: window.location.origin,
    }
    AuthService.register(formData).then(
      () => {
        setLoading(false)
        notificationService.Success('Đăng ký thành công, vui lòng kiểm tra Email của bạn')
        navigate('/login')
      },
      (error) => {
        setLoading(false)
        notificationService.Danger(error.response.data)
        setError('confirmPassword', { message: error.response.data })
      },
    )
  }

  return (
    <>
      <div className="bg-body-secondary">
        <div className="position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-5 col-xxl-3">
                <div className="card mb-0 px-3">
                  <div className="card-body">
                    <Link to="/home">
                      <img
                        width="70"
                        height="70"
                        className="text-center d-block py-2 w-100 fs-4"
                        src={logo}
                        alt="logo"
                      />
                    </Link>
                    <p className="text-center fs-5 text-light-emphasis">Đăng ký</p>
                    <form onSubmit={handleSubmit(handleSumitRegister)} method="POST">
                      <div className="mb-3">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Địa chỉ Email"
                          {...register('email', {
                            required: 'Email không được để trống',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email không đúng định dạng',
                            },
                          })}
                        />
                        {loading && (
                          <div id="spinner" className="position-absolute" style={{ top: '27%', right: 12 }}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        <span className="text-danger">{errors.email && errors.email.message}</span>
                      </div>
                      <div className="mb-3">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Tên của bạn" />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                          placeholder="Số điện thoại"
                          {...register('phone', {
                            required: 'Số điện thoại không được để trống',
                            maxLength: { value: 10, message: 'Tối đa 10 ký tự' },
                            pattern: {
                              value: /^[0-9\b]+$/,
                              message: 'Vui lòng chỉ nhập số',
                            },
                          })}
                        />
                        <span className="text-danger">{errors.phone && errors.phone.message}</span>
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Mật khẩu"
                          {...register('password', {
                            required: 'Vui lòng nhập mật khẩu',
                            minLength: {
                              value: 6,
                              message: 'Mật khẩu ít nhất 6 ký tự',
                            },
                          })}
                        />
                        <span className="text-danger">{errors.password && errors.password.message}</span>
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Xác nhân mật khẩu"
                          {...register('confirmPassword', {
                            required: 'Vui lòng nhập xác nhận mật khẩu',
                            validate: (value) => value === getValues('password') || 'Mật khẩu xác nhận không khớp',
                          })}
                        />
                        <span className="text-danger">{errors.confirmPassword && errors.confirmPassword.message}</span>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                        Đăng ký
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="mb-0">Đã có tài khoản?</p>
                        <Link className="mx-1" to="/login">
                          Đăng nhập
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
