import Vue from 'vue'
import dayjs from 'dayjs'

Vue.prototype.$dayjs = dayjs
export default ({ app }, inject) => { app.dayjs = dayjs }
