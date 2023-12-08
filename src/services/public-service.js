import axios from 'axios'

const Products_URL = 'http://localhost:8070/api/products/'

const getProducts = () => {
  return axios.get(Products_URL + `getProducts`)
}

const PublicService = {
  getProducts,
}
export default PublicService
