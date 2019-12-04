<template lang="pug">
.calendar
  calendar-view(:showDate="showDate" :events="events"
    @click-date="onClickDate" current-period-label="Today")
    calendar-view-header.calendar__header(slot="header" slot-scope="{ headerProps }"
      @input="setShowDate" :header-props="headerProps")
    .calendar__dayHeader.cv-header-day(slot="dayHeader" slot-scope="{ index, label }")
      .calendar__monthlyEvent.cv-event(v-if="index === 'dow0' && monthlyEvent"
        :class="monthlyEvent.classes")
        span {{ monthlyEvent.title }}
      span {{ label }}
    .calendar__dayContent(slot="dayContent" slot-scope="{ day }" :class="{'-today': isToday(day)}")
      .dayContent__day {{ day.getDate() }}
    .calendar__event.cv-event(slot="event" slot-scope="{ event }" :class="event.classes")
      span(:key="event.id") {{ event.title }}
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
export default {
  components: { CalendarView, CalendarViewHeader },
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
    ...mapGetters({
      date: 'getDate',
      showDate: 'getShowingCalendarDate',
      events: 'getCalendarEvents',
      monthlyEvent: 'getCalendarMonthlyEvent'
    })
  },
  watch: {
    showingYearMonth () {
      this.$store.dispatch('updateCalendarEvents')
    },
    date () {
      this.setShowDate(this.date)
    }
  },
  created () {
    this.$store.dispatch('updateCalendarEvents')
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
    padding: 12px 20px 24px
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
  &__monthlyEvent
    position: absolute
    top: 35px
    left: 20px
    width: 100px
</style>

<style lang="stylus">
.calendar
  .cv-wrapper
    position: relative
  .nextYear, .previousYear
    display: none
  .periodLabel
    margin: 0
    padding: 5px 0
    font-size: 14px
    vertical-align: middle
    font-weight: bold
    color: var(--routeeColorBlack)
  .cv-header-nav
    > *
      width: 50px
      font-size: 12px
      color: var(--routeeColorBlack)
      cursor: pointer
      transition: .1s
      outline: none
      font-weight: bold
      &:hover
        color: var(--routeeColorPrimary)
        border-color: var(--routeeColorSecondary)
        background-color: var(--routeeColorThirdry)
    .currentPeriod
      width: 70px
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
    > span
      color: var(--routeeColorBlack)
      font-weight: bold
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
      &.calendar__event
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
