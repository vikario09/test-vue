import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || ''
    if (token) {
      config.headers['Token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)


export default instance