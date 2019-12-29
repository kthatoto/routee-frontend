export default () => ({
  user: {
    uid: null,
    email: null,
    emailVerified: null,
    jwt: null
  },
  calendar: {
    date: new Date(),
    showingDate: new Date(),
    events: [],
    monthlyEvent: {}
  }
})
