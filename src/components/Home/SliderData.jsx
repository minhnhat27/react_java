import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import styles from '../../pages/Home/Home.module.scss'
import image from '../../assets/img'

export default function Pay() {
  const properties = {
    duration: 3000,
    transitionDuration: 500,
    indicators: true,
    arrows: true,
    pauseOnHover: false,
  }

  return (
    <Slide {...properties}>
      <div className={styles['each-slide-effect']}>
        <img src={image.slider1} draggable="false" alt="hinh"></img>
      </div>
      <div className={styles['each-slide-effect']}>
        <img src={image.slider2} draggable="false" alt="hinh"></img>
      </div>
      <div className={styles['each-slide-effect']}>
        <img src={image.slider3} draggable="false" alt="hinh"></img>
      </div>
    </Slide>
  )
}
