<template lang="pug">
.calendar
  calendar-view(:showDate="showDate" :events="events"
    @click-date="onClickDate" current-period-label="Today")
    calendar-view-header.calendar__header(slot="header" slot-scope="{ headerProps }"
      @input="setShowDate" :header-props="headerProps")
    .calendar__dayContent(slot="dayContent" slot-scope="{ day }" :class="{'-today': isToday(day)}")
      .dayContent__day {{ day.getDate() }}
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
export default {
  components: { CalendarView, CalendarViewHeader },
  data () {
    return {
      showDate: null,
      events: [
        { startDate: new Date(2019, 10, 3), title: 'heyaaaaaa!' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      date: 'getDate'
    })
  },
  created () {
    this.showDate = this.date
  },
  methods: {
    isToday (date) {
      console.log(date)
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
  .cv-day
    &.outsideOfMonth
      color: #c0c4cc
    &.today
      color: var(--routeeColorPrimary)
  .cv-day-number
    display: none
</style>
