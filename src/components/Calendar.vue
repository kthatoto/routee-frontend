<template lang="pug">
.calendar
  calendar-view(:showDate="showDate" :events="computedEvents"
    @click-date="onClickDate" current-period-label="Today")
    calendar-view-header.calendar__header(slot="header" slot-scope="{ headerProps }"
      @input="setShowDate" :header-props="headerProps")
    .calendar__dayContent(slot="dayContent" slot-scope="{ day }" :class="{'-today': isToday(day)}")
      .dayContent__day {{ day.getDate() }}
    .calendar__event.cv-event(slot="event" slot-scope="{ event, top }" :class="event.classes" :style="{ top }")
      span
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
export default {
  components: { CalendarView, CalendarViewHeader },
  data () {
    return {
      showDate: null,
      events: []
    }
  },
  computed: {
    showingDateStartOfMonth () {
      return this.$dayjs(this.showDate).startOf('month').startOf('week')
    },
    showingDateEndOfMonth () {
      return this.$dayjs(this.showDate).endOf('month').endOf('week')
    },
    showingDateCount () {
      return this.showingDateEndOfMonth.diff(this.showingDateStartOfMonth, 'day') + 1
    },
    computedEvents () {
      let date = this.showingDateStartOfMonth
      return [...Array(this.showingDateCount)].map((_) => {
        const status = Math.random() < 0.8 ? 'done' : 'imcomplete'
        const event = {
          startDate: date,
          title: ' ',
          classes: `-${status}`
        }
        date = date.add(1, 'day')
        return event
      }).concat({
        startDate: new Date(2019, 10, 1),
        endDate: new Date(2019, 10, 6),
        classes: '-done',
        title: ' '
      }).concat({
        startDate: new Date(2019, 10, 10),
        endDate: new Date(2019, 10, 16),
        classes: '-imcomplete',
        title: ' '
      })
    },
    ...mapGetters({
      date: 'getDate'
    })
  },
  created () {
    this.showDate = this.date
  },
  methods: {
    isToday (date) {
      return this.$dayjs(this.date).isSame(this.$dayjs(date), 'date')
    },
    setShowDate (date) {
      this.showDate = date
    },
    onClickDate (date) {
      this.showDate = date
      this.$store.commit('changeDate', date)
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
    border: none
    height: 10px
    &.-done
      background-color: var(--routeeColorSuccess)
    &.-imcomplete
      background-color: lightgray
</style>
