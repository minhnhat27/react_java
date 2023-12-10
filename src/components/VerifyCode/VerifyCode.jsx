import { Link, useSearchParams } from 'react-router-dom'
import AuthService from '../../services/auth-service'
import NotFound from '../NotFound/NotFound'
import { useState } from 'react'
import { useEffect } from 'react'

export default function VerifyCode() {
  const [searchParams] = useSearchParams()
  const [verifiedResult, setVerifiedResult] = useState(false)

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      const verifyCode = async () => {
        const result = await AuthService.verifyCode(code)
        setVerifiedResult(result)
      }
      verifyCode()
    }
  }, [searchParams])

  if (verifiedResult) {
    return (
      <div className="container-fluid">
        <div className="text-center my-5">
          <h1>Thành công!</h1>
          <h3>Đã xác nhận email. Vui lòng đăng nhập lại</h3>
          <Link type="button" className="btn btn-primary m-3 text-white" to="/login">
            Đăng nhập
          </Link>
        </div>
      </div>
    )
  } else {
    return <NotFound />
  }
}
