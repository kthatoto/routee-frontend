export default {
  setUser (state, user) {
    state.user.uid = user.uid
    state.user.email = user.email
    state.user.emailVerified = user.emailVerified
  },
  changeCalendarDate (state, date) {
    state.calendar.date = date
  },
  changeCalendarShowingDate (state, date) {
    state.calendar.showingDate = date
  },
  setCalendarEvents (state, calendarEvents) {
    state.calendar.events = calendarEvents
  },
  setCalendarMonthlyEvent (state, calendarMonthlyEvent) {
    state.calendar.monthlyEvent = calendarMonthlyEvent
  }
}
