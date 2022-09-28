import axios from 'axios'
import { toast } from 'react-toastify'

axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status >= 403) {
    toast.error('Opss.. Somthing Went Wrong ☹️')
  }

  return Promise.reject(err)
})

export function setDefaultCommonHeader(header, value) {
  axios.defaults.headers.common[header] = value
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDefaultCommonHeader,
}

export default httpService
