import style from './Products.module.scss'
import products from '../../db/data'
import Sort from '../../components/ProductsCard/Sort/Sort'
import { Recommended } from '../../components/ProductsCard/Recommended/Recommended'
import { Sidebar } from '../../components/ProductsSidebar/Sidebar'
import { Card } from '../../components/UI/Card'

import { useState } from 'react'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(10000000)

  const [query, setQuery] = useState('')

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
    return filteredProducts.map(({ id, main_image, name, star, prevPrice, newPrice }) => (
      <div key={id}>
        <Card img={main_image} title={name} star={star} prevPrice={prevPrice} newPrice={newPrice} />
      </div>
    ))
  }

  const result = filteredData(products, selectedCategory, selectedBrand, selectedPrice, query)
  return (
    <div className={`${style.bgProduct}`}>
      <Sidebar handleChange={handleChange} />
      {/* <Navigation query={query} handleInputChange={handleInputChange} /> */}
      <Recommended handleClick={handleClick} />
      <Sort result={result} />
    </div>
  )
}
