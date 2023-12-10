import axios from 'axios'
import authHeader from './auth-header'

const Profile_URL = 'http://localhost:8070/api/profile/'
const Cart_URL = 'http://localhost:8070/api/cart/'
const Order_URL = 'http://localhost:8070/api/order/'

const getProfile = () => {
  return axios.get(Profile_URL + `getProfile`, { headers: authHeader() })
}

const updateProfile = async (user) => {
  return await axios.put(Profile_URL + 'updateProfile', user, { headers: authHeader() })
}

const getCart = async () => {
  return await axios.get(Cart_URL + 'getCart', { headers: authHeader() })
}

const addToCart = async (data) => {
  await axios.post(Cart_URL + 'addToCart', data, { headers: authHeader() })
}

const deleteCart = async (data) => {
  await axios.post(Cart_URL + 'deleteCart', data, { headers: authHeader() })
}

const deleteAllCart = async () => {
  await axios.get(Cart_URL + 'deleteAllCart', { headers: authHeader() })
}

const orderProducts = async (data) => {
  await axios.post(Order_URL + 'orderProducts', data, { headers: authHeader() })
}

const getAllOrder = () => axios.get(Order_URL + 'getOrders', { headers: authHeader() })

const updateOrder = (data) => axios.post(Order_URL + 'updateOrder', data, { headers: authHeader() })

const UserService = {
  getProfile,
  updateProfile,
  getCart,
  addToCart,
  deleteCart,
  deleteAllCart,
  orderProducts,
  getAllOrder,
  updateOrder,
}
export default UserService
