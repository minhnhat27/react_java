import classNames from 'classnames/bind'
import Styles from './Pay.module.scss'
import ThongTinKH from '../../components/Pay/ThongTinKH'
import ThongTinSP from '../../components/Pay/ThongTinSP'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import UserService from '../../services/user-service'
import notificationService from '../../services/notificationService'
import NotFound from '../../components/NotFound/NotFound'

const cx = classNames.bind(Styles)

export default function Pay() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [info, setInfo] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: info,
  })

  useEffect(() => {
    UserService.getProfile()
      .then((response) => {
        const user = {
          ...info,
          name: response.data.lastname + ' ' + response.data.firstname,
          phone: response.data.phone,
          email: response.data.email,
        }
        setInfo(user)
        reset(user)
      })
      .catch(() => {
        const user = {
          name: '',
          phone: '',
          email: '',
        }
        setInfo(user)
        reset(user)
      })
  }, [reset])

  const handleSubmitPay = () => {
    var productId = []
    state.products.forEach((items) => {
      productId.push(items.productId)
    })
    const data = {
      paymentType: watch('paymentType'),
      city: watch('province'),
      district: watch('district'),
      ward: watch('ward'),
      street: watch('street'),
      productId: productId,
      subtotal: state.total - state.discount,
    }

    UserService.orderProducts(data)
      .then(() => {
        navigate('/profile/orders', { state: { successOrder: true } })
        notificationService.Success('Đặt hàng thành công')
      })
      .catch(() => notificationService.Danger('Đặt hàng thất bại'))
  }

  const handleExternalSubmit = () => {
    handleSubmit(handleSubmitPay)()
  }

  if (state == null) {
    return <NotFound />
  } else {
    return (
      <>
        <div className={cx('container')}>
          <div>
            <h2 className={cx('title')}>THÔNG TIN THANH TOÁN </h2>
          </div>
          <div className={cx('row')}>
            <div className={cx('col-md-6')}>
              <ThongTinKH
                register={register}
                watch={watch}
                errors={errors}
                handleSubmit={handleSubmit}
                handleSubmitPay={handleSubmitPay}
              />
            </div>
            <div className={cx('col-md-6')}>
              <ThongTinSP state={state} />
              <button type="button" onClick={handleExternalSubmit} className={cx('btn-primary')}>
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
