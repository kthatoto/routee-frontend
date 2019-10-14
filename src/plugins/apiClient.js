import Vue from 'vue'
import axios from 'axios'
export default ({ app }, inject) => {
  Vue.prototype.$apiClient = (method, url, data = null) => {
    return axios({
      method,
      url,
      data,
      headers: { Authorization: localStorage.routeeToken }
    })
  }
}
