import axios from 'axios'

export const get = (url, config) => axios.get(url, config)

export default {
  get,
}
