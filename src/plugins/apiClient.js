import Vue from 'vue'
import axios from 'axios'

export default ({ app }, inject) => {
  const apiClient = (method, url, data = null) => {
    return axios({
      method,
      url: process.env.serverUrl + url,
      data,
      headers: { Authorization: localStorage.routeeToken }
    })
  }
  Vue.prototype.$apiClient = apiClient
  app.apiClient = apiClient
}
