import axios from 'axios'

const Products_URL = 'http://localhost:8070/api/products/'

const getProducts = () => {
  return axios.get(Products_URL + `getProducts`)
}
const getTopProducts = () => {
  return axios.get(Products_URL + `getTopProducts`)
}
const getProduct = (id) => {
  return axios.get(Products_URL + `product/${id}`)
}

const PublicService = {
  getProducts,
  getTopProducts,
  getProduct,
}
export default PublicService
