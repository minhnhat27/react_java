import { useEffect, useState } from 'react'

export const Image = ({ img, title, width, height, className, folder, draggable }) => {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = folder
          ? await import(`../../assets/img/${folder}/${img}`)
          : await import(`../../assets/img/${img}`)
        setImageSrc(imageModule.default)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }
    loadImage()
  }, [img])
  return <img src={imageSrc} alt={title} className={className} width={width} height={height} draggable={draggable} />
}
