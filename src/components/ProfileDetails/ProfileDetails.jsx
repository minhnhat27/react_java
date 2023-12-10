import style from './ProfileDetails.module.scss'
import UserService from '../../services/user-service'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import notificationService from '../../services/notificationService'
import logo from '../../logo.svg'

export default function ProfileDetails() {
  const [user, setUser] = useState({
    picture: logo,
    username: '',
    lastname: '',
    firstname: '',
    email: '',
    birthday: '',
    sex: '-1',
  })
  const fileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    defaultValues: user,
  })

  useEffect(() => {
    UserService.getProfile()
      .then((response) => {
        const updatedData = {}
        for (let key in response.data) {
          if (response.data[key] === null) {
            updatedData[key] = ''
          } else {
            updatedData[key] = response.data[key].toString()
            if (key === 'birthday') {
              updatedData[key] = response.data[key].substring(0, 10)
            }
          }

          if (key === 'picture') {
            updatedData[key] = logo
          }
        }
        setUser(updatedData)
        reset(updatedData)
      })
      .catch(() => {
        notificationService.Warning('Có lỗi xảy ra. Không thể lấy thông tin người dùng')
      })
  }, [reset])
  const handleClickUpload = () => {
    fileInputRef.current.click()
  }
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setUser({
        ...user,
        picture: URL.createObjectURL(selectedFile),
      })
    }
  }

  const handleSubmitProfile = () => {
    UserService.updateProfile({
      ...getValues(),
      sex: parseInt(watch('sex')),
    })
      .then(
        () => {
          setUser(getValues())
          notificationService.Success('Cập nhật thông tin thành công')
        },
        () => {
          notificationService.Danger('Cập nhật thông tin không thành công. Vui lòng thử lại')
        },
      )
      .catch(() => notificationService.Danger('Cập nhật thông tin không thành công. Vui lòng thử lại'))
  }

  const validateDate = (selectedDate) => {
    if (selectedDate.toString() !== 'Invalid Date') {
      const today = new Date()
      const selected = new Date(selectedDate)
      return selected <= today || 'Ngày sinh không thể lớn hơn ngày hiện tại'
    }
  }

  return (
    <>
      <div className={`${style.wrapper} container-fluild`}>
        <div className={style.accountDetail}>
          <div>Thông tin tài khoản</div>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="row mt-3">
          <div className="col-md-8 col-12">
            <form onSubmit={handleSubmit(handleSubmitProfile)} method="POST">
              <table className={style.profileDetails}>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="email">Email</label>
                    </td>
                    <td>
                      <input
                        readOnly
                        type="text"
                        className="form-control-plaintext"
                        id="email"
                        name="email"
                        {...register('email')}
                        defaultValue=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="tel">Số điện thoại</label>
                    </td>
                    <td>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        {...register('phone', {
                          required: 'Số điện thoại không được để trống',
                          maxLength: { value: 10, message: 'Tối đa 10 ký tự' },
                          pattern: {
                            value: /^[0-9\b]+$/,
                            message: 'Vui lòng chỉ nhập số',
                          },
                        })}
                        defaultValue={watch('phone')}
                      />
                      <span className="text-danger">{errors.phone && errors.phone.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="lastname">Họ</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        {...register('lastname')}
                        defaultValue={watch('lastname')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="firstname">Tên</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        {...register('firstname')}
                        defaultValue={watch('firstname')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Giới tính</label>
                    </td>
                    <td>
                      <div className={style.sexField}>
                        <input
                          value="0"
                          type="radio"
                          id="male"
                          name="sex"
                          className="form-check-input"
                          {...register('sex')}
                        />
                        <label htmlFor="male">Nam</label>
                        <input
                          value="1"
                          type="radio"
                          id="female"
                          name="sex"
                          className="form-check-input"
                          {...register('sex')}
                        />
                        <label htmlFor="female">Nữ</label>
                        <input
                          value="2"
                          type="radio"
                          id="other"
                          name="sex"
                          className="form-check-input"
                          {...register('sex')}
                        />
                        <label htmlFor="other">Khác</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="birthday">Ngày sinh</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="birthday"
                        name="birthday"
                        {...register('birthday', {
                          valueAsDate: true,
                          validate: validateDate,
                        })}
                      />
                      <span className="text-danger">{errors.birthday && errors.birthday.message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button type="submit" className="btn btn-primary mb-3">
                        Lưu
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className={`${style.picUpload} col-md-4 col-12`}>
            <img id={style.userProfileImg} src={user.picture} draggable="false" alt="" />
            <input
              ref={fileInputRef}
              onChange={handleFileSelect}
              hidden
              className="d-none"
              type="file"
              accept=".jpg,.jpeg,.png"
            />
            <button type="submit" onClick={handleClickUpload} className="btn btn-outline-dark my-2">
              Chọn ảnh
            </button>
            <div>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng: .JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
