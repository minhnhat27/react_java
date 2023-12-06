import { useEffect, useState } from 'react'
import style from '../ProductsCard/ProductsCard.module.scss'

export const Image = ({ img, title }) => {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../../assets/img/${img}`)
        setImageSrc(imageModule.default)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }
    loadImage()
  }, [img])
  return <img src={imageSrc} alt={title} className={style.cardImg} />
}
