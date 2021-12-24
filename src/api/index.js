import axios from 'axios'

const service = axios.create({
  // baseURL: '127.0.0.1:3000',
  timeout: 6000
})

export default service
