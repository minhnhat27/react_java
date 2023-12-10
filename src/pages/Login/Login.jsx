import { useAuth } from '../../App'
import actions from '../../services/authAction'
import AuthService from '../../services/auth-service'
import logo from '../../logo.svg'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import notificationService from '../../services/notificationService'

export default function Login() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  // const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm()

  const email = watch('email')
  const password = watch('password')

  const handleSubmitLogin = () => {
    setLoading(true)

    AuthService.login(email, password).then(
      () => {
        dispatch(actions.actionLogin)
        setLoading(false)
        notificationService.Success('Đăng nhập thành công')
        navigate('/home')
      },
      (error) => {
        setLoading(false)
        dispatch(actions.actionLogout)
        notificationService.Danger('Đăng nhập thất bại')
        setError('password', { message: error.response.data })
        setValue('password', '')
      },
    )
  }

  // const handleChangeCheck = (e) => {
  //   setCheck(!check)
  // }

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
                    <p className="text-center fs-5 text-light-emphasis">Đăng nhập</p>
                    <form onSubmit={handleSubmit(handleSubmitLogin)} method="POST">
                      <div className="mb-3">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          id="email"
                          {...register('email', {
                            required: 'Email không được để trống',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email không đúng định dạng',
                            },
                          })}
                        />
                        {loading && (
                          <div id="spinner" className="position-absolute" style={{ top: '38%', right: 12 }}>
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        <span className="text-danger">{errors.email && errors.email.message}</span>
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mật khẩu"
                          name="password"
                          id="password"
                          {...register('password', { required: 'Mật khẩu không được trống' })}
                        />
                        <span className="text-danger">{errors.password && errors.password.message}</span>
                      </div>
                      {/* <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            id="flexCheckChecked"
                            onChange={handleChangeCheck}
                            value={check}
                          />
                          <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                            Ghi nhớ
                          </label>
                        </div>
                        <Link className="text-primary">Quên mật khẩu?</Link>
                      </div> */}
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                        Đăng nhập
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="mb-0">Bạn chưa có tài khoản?</p>
                        <Link className="mx-1" to="/register">
                          Tạo tài khoản
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
