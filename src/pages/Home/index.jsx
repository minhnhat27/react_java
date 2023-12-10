import React from 'react'
import classNames from 'classnames/bind'
import Styles from './Home.module.scss'
import Sliders from '../../components/Home/SliderData'
import Promo from '../../components/Home/Promo'
import Brands from '../../components/Home/Brands'
import MainContent from '../../components/Home/MainContent'
import ProductWidget from '../../components/Home/ProductWidget'
const cx = classNames.bind(Styles)

export default function Pay() {
  return (
    <>
      <Sliders />
      <div className={cx('container')}>
        <Promo />
        <MainContent />
        <Brands />
        <ProductWidget />
      </div>
    </>
  )
}
