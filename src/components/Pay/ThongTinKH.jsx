import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ThongTinKH({ register, watch, errors, handleSubmit, handleSubmitPay }) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  // const [selectedProvince, setSelectedProvince] = useState('')
  // const [selectedDistrict, setSelectedDistrict] = useState('')
  // const [selectedWard, setSelectedWard] = useState('')
  const selectedProvince = watch('province')
  const selectedDistrict = watch('district')

  useEffect(() => {
    // Fetch provinces data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
        )
        setProvinces(response.data)
      } catch (error) {
        console.error('Error fetching provinces data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (selectedProvince) {
          const response = await axios.get(
            `https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`,
          )
          const selectedProvinceData = response.data.find((province) => province.Name === selectedProvince)
          setDistricts(selectedProvinceData?.Districts || [])
        } else {
          setDistricts([])
        }
      } catch (error) {
        console.error('Error fetching districts data:', error)
      }
    }

    fetchDistricts()
  }, [selectedProvince])

  useEffect(() => {
    // Fetch wards data based on the selected district
    const fetchWards = async () => {
      try {
        if (selectedDistrict) {
          const selectedDistrictData = districts.find((district) => district.Name === selectedDistrict)
          setWards(selectedDistrictData?.Wards || [])
        } else {
          setWards([])
        }
      } catch (error) {
        console.error('Error fetching wards data:', error)
      }
    }

    fetchWards()
  }, [selectedDistrict, districts])

  return (
    <>
      <div>
        <h3>Thông tin khách hàng</h3>
        <form onSubmit={handleSubmit(handleSubmitPay)} method="POST">
          <div className="mb-3">
            <label htmlFor="paymentType" className="form-label">
              Phương thức thanh toán:
            </label>
            <select
              className="form-control"
              id="paymentType"
              name="paymentType"
              defaultValue={'COD'}
              {...register('paymentType', { required: 'Vui chọn phương thức thanh toán' })}
            >
              <option value="COD">Thanh toán khi nhận hàng (COD)</option>
              {/* <option value="VNPay">Thanh toán qua VNPay</option> */}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label">
              Họ và tên:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              {...register('name', { required: 'Vui lòng nhập tên của bạn' })}
            />
            <span className="text-danger">{errors.name && errors.name.message}</span>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="expiryDate">Số điện thoại:</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                {...register('phone', {
                  required: 'Vui lòng nhập số điện thoại',
                  maxLength: { value: 10, message: 'Tối đa 10 ký tự' },
                  pattern: {
                    value: /^[0-9\b]+$/,
                    message: 'Vui lòng chỉ nhập số',
                  },
                })}
              />
              <span className="text-danger">{errors.phone && errors.phone.message}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="cvv">Email liên hệ:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không đúng định dạng',
                  },
                })}
              />
              <span className="text-danger">{errors.email && errors.email.message}</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="province" className="form-label">
              Tỉnh/Thành phố:
            </label>
            <br />
            <select
              className="form-control"
              id="province"
              // value={selectedProvince}
              // onChange={(e) => {
              //   setSelectedProvince(e.target.value)
              // }}
              {...register('province', { required: 'Vui lòng chọn tỉnh thành' })}
            >
              <option value="">Chọn tỉnh thành</option>
              {provinces.map((province) => (
                <option key={province.Id} value={province.Name}>
                  {province.Name}
                </option>
              ))}
            </select>
            <span className="text-danger">{errors.province && errors.province.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="district" className="form-label">
              Quận/Huyện:
            </label>
            <br />
            <select
              id="district"
              className="form-control"
              // value={selectedDistrict}
              // onChange={(e) => {
              //   setSelectedDistrict(e.target.value)
              //   setValue('district', e.target.value)
              // }}
              {...register('district', { required: 'Vui lòng chọn quận huyện' })}
            >
              <option value="">Chọn huyện</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Name}>
                  {district.Name}
                </option>
              ))}
            </select>
            <span className="text-danger">{errors.district && errors.district.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="ward" className="form-label">
              Phường/Xã:
            </label>
            <br />
            <select
              id="ward"
              className="form-control"
              // value={selectedWard}
              // onChange={(e) => setSelectedWard(e.target.value)}
              {...register('ward', { required: 'Vui lòng chọn phường xã' })}
            >
              <option value="">Chọn xã</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Name}>
                  {ward.Name}
                </option>
              ))}
            </select>
            <span className="text-danger">{errors.ward && errors.ward.message}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label">
              Địa chỉ chi tiết:
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              placeholder="Nhập tên đường"
              {...register('street', { required: 'Vui lòng nhập địa chỉ chi tiết' })}
            />
            <span className="text-danger">{errors.street && errors.street.message}</span>
          </div>
        </form>
      </div>
    </>
  )
}
