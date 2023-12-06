import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <div className="container-fluid">
        <div className="text-center my-5">
          <h1>Oops!</h1>
          <h2>404 - Không thể tìm thấy trang</h2>
          <Link type="button" className="btn btn-primary m-3 text-white" to="/home">
            Trang chủ
          </Link>
        </div>
      </div>
    </>
  )
}
