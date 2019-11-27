<template lang="pug">
.calendar
  calendar-view(:showDate="showDate" :events="calendarEvents"
    @click-date="onClickDate" current-period-label="Today")
    calendar-view-header.calendar__header(slot="header" slot-scope="{ headerProps }"
      @input="setShowDate" :header-props="headerProps")
    .calendar__dayContent(slot="dayContent" slot-scope="{ day }" :class="{'-today': isToday(day)}")
      .dayContent__day {{ day.getDate() }}
    .calendar__event.cv-event(slot="event" slot-scope="{ event }" :class="eventClasses(event)")
      span {{ event.title }}
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
export default {
  components: { CalendarView, CalendarViewHeader },
  data () {
    return {
      statuses: {
        daily: [],
        weekly: []
      }
    }
  },
  computed: {
    showingYear () {
      return this.$dayjs(this.showDate).year()
    },
    showingMonth () {
      return this.$dayjs(this.showDate).month() + 1
    },
    showingYearMonth () {
      return `${this.showingYear}-${this.showingMonth}`
    },
    showingFirstDate () {
      return this.$dayjs(this.showDate).startOf('month').startOf('week')
    },
    showingLastDate () {
      return this.$dayjs(this.showDate).endOf('month').endOf('week')
    },
    showingDateCount () {
      return this.showingLastDate.diff(this.showingFirstDate, 'day') + 1
    },
    ...mapGetters({
      date: 'getDate',
      showDate: 'getShowingCalendarDate',
      calendarEvents: 'getCalendarEvents'
    })
  },
  watch: {
    showingYearMonth () {
      this.$store.dispatch('updateCalendarEvents')
      // this.fetchStatus()
      // this.setCalendarEvents()
    },
    date () {
      this.setShowDate(this.date)
    }
  },
  methods: {
    isToday (date) {
      return this.$dayjs(this.date).isSame(this.$dayjs(date), 'date')
    },
    setShowDate (date) {
      this.$store.commit('changeShowingCalendarDate', date)
    },
    onClickDate (date) {
      this.setShowDate(date)
      this.$store.commit('changeDate', date)
    },
    eventClasses (event) {
      const classes = event.classes
      if (this.$dayjs(event.startDate).isSame(this.$dayjs(event.endDate))) {
        classes.push('-oneDay')
      }
      return classes
    },
    async fetchStatus () {
      const query = `year=${this.showingYear}&month=${this.showingMonth}`
      const res = await this.$apiClient('get', `http://0.0.0.0:3000/routines/status?${query}`)
        .catch((err) => { return err.response })
      if (res.status !== 200) {
        return
      }
      this.statuses.daily = res.data.daily
      this.statuses.weekly = res.data.weekly
    },
    setCalendarEvents () {
      const events = ['daily', 'weekly'].map((statusType) => {
        if (!this.statuses[statusType]) {
          return []
        }
        return this.statuses[statusType].map((s) => {
          const status = s.total_routines_count === s.done_routines_count ? 'done' : 'imcomplete'
          return {
            startDate: new Date(s.start_date),
            endDate: new Date(s.end_date),
            title: `${s.done_routines_count} / ${s.total_routines_count}`,
            classes: `-${status}`
          }
        })
      })
      this.$store.commit('setCalendarEvents', Array.prototype.concat.apply([], events))
    }
  }
}
</script>

<style lang="stylus" scoped>
.calendar
  borderColor = #ebeef5
  background-color: white
  border-radius: 5px
  &__header
    padding: 12px 20px
    border: none
    border-bottom: 1px solid borderColor
    display: flex
    flex-direction: row-reverse
  &__dayContent
    width: 100%
    height: 100%
    cursor: pointer
    transition: .1s
    &:hover
      background-color: #f2f8fe
    &.-today
      background-color: #f0f9eb
      &:hover
        background-color: #f2f8fe
    .dayContent
      &__day
        font-size: 11px
        padding: 3px 3px 0
</style>

<style lang="stylus">
.calendar
  .nextYear, .previousYear
    display: none
  .periodLabel
    margin: 0
    padding: 5px 0
    font-size: 14px
    vertical-align: middle
  .cv-header-nav
    > *
      width: 50px
      font-size: 12px
      color: var(--routeeColorBlack)
      cursor: pointer
      transition: .1s
      outline: none
      &:hover
        color: var(--routeeColorPrimary)
        border-color: var(--routeeColorSecondary)
        background-color: var(--routeeColorThirdry)
    .previousPeriod
      border-radius: 3px 0 0 3px
      border-right: none
    .nextPeriod
      border-radius: 0 3px 3px 0
      border-left: none
  .cv-header-days
    border: none
    margin: 12px 20px 0
  .cv-header-day
    border: none
    padding-bottom: 12px
    color: var(--routeeColorBlack)
  .cv-weeks
    margin: 0 20px 16px
  .cv-week
    height: 100px
    flex-basis: unset
    overflow: hidden
  .cv-day
    &.outsideOfMonth
      color: #c0c4cc
    &.today
      color: var(--routeeColorPrimary)
  .cv-day-number
    display: none
  .cv-event
    height: 15px
    padding: 0
    text-align: right
    cursor: pointer
    span
      font-size: 10px
      padding-right: 5px
    &.-oneDay
      top: 45px
      width: calc(100% / (7 * 1.5))
      border-radius: 0 5px 5px 0
      border-style: solid
      border-width: 1px
      border-left: none
    &:not(.-oneDay)
      top: 25px
      border-style: solid
      border-width: 1px
      &.toBeContinued:not(.continued)
        border-radius: 3px 0 0 3px
        border-right: none
      &.toBeContinued.continued
        border-right: none
        border-left: none
      &.continued:not(.toBeContinued)
        border-radius: 0 3px 3px 0
        border-left: none
      &:not(.toBeContinued):not(.continued)
        border-radius: 3px
    &.-done
      background-color: var(--routeeColorSuccessSecondary)
      border-color: var(--routeeColorSuccess)
      color: var(--routeeColorSuccess)
    &.-imcomplete
      background-color: lightgray
      border-color: gray
      color: #333
</style>
