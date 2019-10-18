export const state = () => ({
  date: new Date()
})

export const mutations = {
  changeDate (state, date) {
    state.date = date
  }
}

export const getters = {
  getDate (state) {
    return state.date
  }
}
