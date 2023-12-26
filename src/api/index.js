import axios from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 6000,
  cancelToken: source.token
})

export default service
