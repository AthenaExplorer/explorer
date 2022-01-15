export default function({ $axios, error }) {
  $axios.defaults.timeout = 60 * 1000
  $axios.interceptors.request.use((config) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  $axios.onRequest(config => {

  })
  $axios.interceptors.response.use((res) => {
    return res.data
  }, (e) => {
    return Promise.reject(e)
  })
  $axios.onError(e => {
    if (process.server) {
      error(e)
    }
  })
}