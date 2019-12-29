export default () => ({
  user: {
    uid: null,
    email: null,
    emailVerified: null
  },
  calendar: {
    date: new Date(),
    showingDate: new Date(),
    events: [],
    monthlyEvent: {}
  }
})
