export default {
  getUser (state) {
    return state.user
  },
  getCalendarDate (state) {
    return state.calendar.date
  },
  getCalendarShowingDate (state) {
    return state.calendar.showingDate
  },
  getCalendarEvents (state) {
    return state.calendar.events
  },
  getCalendarMonthlyEvent (state) {
    return state.calendar.monthlyEvent
  }
}
