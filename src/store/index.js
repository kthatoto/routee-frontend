export const state = () => ({
  date: new Date(),
  calendarEvents: []
})

export const mutations = {
  changeDate (state, date) {
    state.date = date
  },
  setCalendarEvents (state, calendarEvents) {
    state.calendarEvents = calendarEvents
  }
}

export const getters = {
  getDate (state) {
    return state.date
  },
  getCalendarEvents (state) {
    return state.calendarEvents
  }
}
