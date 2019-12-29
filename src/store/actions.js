export default {
  signin ({ commit }, user) {
    commit('setUser', { uid: user.uid, email: user.email, emailVerified: user.emailVerified })
  },
  signout ({ commit }) {
    commit('setUser', { uid: null, email: null, emailVerified: null })
  },
  async updateCalendarEvents ({ app, commit, state }) {
    const showingYear = app.dayjs(state.calendar.showingDate).year()
    const showingMonth = app.dayjs(state.calendar.showingDate).month() + 1
    const query = `year=${showingYear}&month=${showingMonth}`
    const res = await app.apiClient('get', `/routines/status?${query}`)
      .catch((err) => { return err.response })
    if (res.status !== 200) {
      return
    }
    const eventsMap = new Map(['daily', 'weekly', 'monthly'].map((statusType) => {
      if (!res.data[statusType]) {
        return [statusType, []]
      }
      return [
        statusType,
        res.data[statusType].map((s, i) => {
          const classes = []
          classes.push(s.total_routines_count === s.done_routines_count ? '-done' : '-imcomplete')
          classes.push(statusType === 'monthly' ? '-monthly' : false)
          classes.push(app.dayjs(s.start_date).isSame(app.dayjs(s.end_date)) ? '-oneDay' : false)
          return {
            id: `${statusType}:${i}`,
            startDate: new Date(s.start_date),
            endDate: new Date(s.end_date),
            title: `${s.done_routines_count} / ${s.total_routines_count}`,
            classes: classes.filter(c => c).join(' ')
          }
        })
      ]
    }))
    commit('setCalendarEvents',
      Array.prototype.concat.apply([],
        eventsMap.get('daily').concat(eventsMap.get('weekly'))
      )
    )
    commit('setCalendarMonthlyEvent', eventsMap.get('monthly')[0])
  }
}
