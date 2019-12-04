export const state = () => ({
  date: new Date(),
  showingCalendarDate: new Date(),
  calendarEvents: []
})

export const actions = {
  async updateCalendarEvents ({ commit, state }) {
    const showingYear = this.app.dayjs(state.showingCalendarDate).year()
    const showingMonth = this.app.dayjs(state.showingCalendarDate).month() + 1
    const query = `year=${showingYear}&month=${showingMonth}`
    const res = await this.app.apiClient('get', `http://0.0.0.0:3000/routines/status?${query}`)
      .catch((err) => { return err.response })
    if (res.status !== 200) {
      return
    }
    const events = ['daily', 'weekly'].map((statusType) => {
      if (!res.data[statusType]) {
        return []
      }
      return res.data[statusType].map((s, i) => {
        const classes = []
        classes.push(s.total_routines_count === s.done_routines_count ? '-done' : '-imcomplete')
        classes.push(statusType === 'monthly' ? '-monthly' : false)
        classes.push(this.app.dayjs(s.start_date).isSame(this.app.dayjs(s.end_date)) ? '-oneDay' : false)
        return {
          id: `${statusType}:${i}`,
          startDate: new Date(s.start_date),
          endDate: new Date(s.end_date),
          title: `${s.done_routines_count} / ${s.total_routines_count}`,
          classes: classes.filter(c => c).join(' ')
        }
      })
    })
    commit('setCalendarEvents', Array.prototype.concat.apply([], events))
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
