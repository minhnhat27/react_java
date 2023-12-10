import axios from 'axios'

const API_URL = 'http://localhost:8070/api/auth/'

const login = async (email, password) => {
  return await axios
    .post(API_URL + 'signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const register = async (data) => {
  return await axios.post(API_URL + 'signup', data)
}

const logout = () => localStorage.removeItem('user')
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))

const verifyCode = async (code) => {
  try {
    const response = await axios.post(API_URL + 'verify', code)
    if (response.status === 200) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

const AuthService = {
  login,
  register,
  logout,
  verifyCode,
  getCurrentUser,
}
export default AuthService
