import React from 'react'
import { FaGift, FaLock, FaTruck } from 'react-icons/fa'
import { FiRefreshCcw } from 'react-icons/fi'

const Promo = () => {
  return (
    <div className="row mt-5">
      <div className="col-md-3 col-sm-6 ">
        <div className="single-promo promo1 bg-primary text-white  text-center h-100" style={{ fontSize: '30px' }}>
          <FiRefreshCcw />
          <p>30 Days return</p>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="single-promo promo2 bg-success text-white  text-center h-100" style={{ fontSize: '30px' }}>
          <FaTruck />
          <p>Free shipping</p>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="single-promo promo3 bg-info text-white  text-center h-100" style={{ fontSize: '30px' }}>
          <FaLock />
          <p>Secure payments</p>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="single-promo promo4 bg-warning text-white text-center h-100" style={{ fontSize: '30px' }}>
          <FaGift />
          <p>New products</p>
        </div>
      </div>
    </div>
  )
}

export default Promo
