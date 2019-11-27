export const state = () => ({
  date: new Date(),
  showingCalendarDate: new Date(),
  calendarEvents: []
})

export const actions = {
  updateCalendarEvents ({ commit, state }) {
    console.log(this)
    // const query = `year=${}`
    // this.app.apiClient
    commit('setCalendarEvents', [])
  }
}

export const mutations = {
  changeDate (state, date) {
    state.date = date
  },
  changeShowingCalendarDate (state, date) {
    state.showingCalendarDate = date
  },
  setCalendarEvents (state, calendarEvents) {
    state.calendarEvents = calendarEvents
  }
}

export const getters = {
  getDate (state) {
    return state.date
  },
  getShowingCalendarDate (state) {
    return state.showingCalendarDate
  },
  getCalendarEvents (state) {
    return state.calendarEvents
  }
}
