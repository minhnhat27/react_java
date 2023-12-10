import style from './Products.module.scss'
// import products from '../../db/data'
import Sort from '../../components/ProductsCard/Sort/Sort'
import { Recommended } from '../../components/ProductsCard/Recommended/Recommended'
import { Sidebar } from '../../components/ProductsSidebar/Sidebar'
import { Card } from '../../components/UI/Card'
import { Search } from '../../components/ProductsCard/Search/Search'

import { useEffect, useState } from 'react'
import PublicService from '../../services/public-service'
import { AiFillStar } from 'react-icons/ai'
import Loading from '../../components/Loading/Loading'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(200000000)
  const [query, setQuery] = useState('')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    PublicService.getProducts()
      .then((response) => {
        const data = response.data
        const newData = data.map((data) => {
          const prevPrice = data.price
          const newPrice = data.price - (data.price * data.discountPercent) / 100
          return { ...data, prevPrice: prevPrice, newPrice: newPrice, star: <AiFillStar className="rating-star" /> }
        })

        setProducts(newData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const filteredItems = products.filter(
    (product) => product.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1,
  )

  const handleChange = (event, filterName) => {
    switch (filterName) {
      case 'category':
        setSelectedCategory(event.target.value)
        break
      case 'brand':
        setSelectedBrand(event.target.value)
        break
      default:
        setSelectedPrice(event.target.value)
    }
  }

  //--------------------------Buttons Filter--------------------------------------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  const filteredData = (products, selectedCategory, selectedBrand, selectedPrice, query) => {
    let filteredProducts = products

    if (query) {
      filteredProducts = filteredItems
    }

    if (selectedCategory || selectedBrand || selectedPrice) {
      filteredProducts = filteredProducts.filter(({ category, brand, newPrice, name }) => {
        if (selectedCategory === '' && selectedBrand === '') {
          return newPrice <= Number(selectedPrice) || name === query
        } else if (selectedCategory === '') {
          return (brand === selectedBrand && newPrice <= Number(selectedPrice)) || name === query
        } else if (selectedBrand === '') {
          return (category === selectedCategory && newPrice <= Number(selectedPrice)) || name === query
        } else {
          return (
            (category === selectedCategory && brand === selectedBrand && newPrice <= Number(selectedPrice)) ||
            name === query
          )
        }
      })
    }
    return filteredProducts.map(({ id, mainImage, name, star, prevPrice, newPrice }) => (
      <div key={id}>
        <Card id={id} img={mainImage} title={name} star={star} prevPrice={prevPrice} newPrice={newPrice} />
      </div>
    ))
  }

  const result = filteredData(products, selectedCategory, selectedBrand, selectedPrice, query)
  if (loading) {
    return <Loading />
  } else {
    return (
      <div className={style.bgProduct}>
        <Sidebar handleChange={handleChange} products={products} />
        <Search query={query} handleInputChange={handleInputChange} />
        <Recommended handleClick={handleClick} handleInputChange={handleInputChange} />
        <Sort result={result} />
      </div>
    )
  }
}
