import httpService from './httpService'
import config from './config.json'
import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'token'

httpService.setDefaultCommonHeader('x-auth-token', getJwt())

export function createUser(user) {
  return httpService.post(`${config.apiUrl}/users`, user)
}

export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  })
  localStorage.setItem(TOKEN_KEY, data.token)
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUser() {
  try {
    const token = getJwt()
    return jwtDecode(token)
  } catch {
    return null
  }
}
export function forgetPassword(email) {
  return httpService.post(`${config.apiUrl}/auth/forget-password`, {
    email,
  })
}

export function resetPassword(password, confirm_password, token) {
  return httpService.post(`${config.apiUrl}/auth/reset-password`, {
    password,
    confirm_password,
    token,
  })
}

const userService = {
  createUser,
  login,
  getJwt,
  logout,
  getUser,
  forgetPassword,
  resetPassword,
}

export default userService
