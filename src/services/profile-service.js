import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8070/api/profile/'

const getProfile = () => {
  return axios.get(API_URL + `getProfile`, { headers: authHeader() })
}

const updateProfile = async (user) => {
  return await axios.put(API_URL + 'updateProfile', user, { headers: authHeader() })
}

const ProfileService = {
  getProfile,
  updateProfile,
}

export default ProfileService
