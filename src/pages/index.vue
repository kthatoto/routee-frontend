<template lang="pug">
.index
  .index__datepicker
    icon.icon(name="chevron-left" @click.native="prevDate")
    .index__date {{ displayHeaderDate }}
    icon.icon(name="chevron-right" @click.native="nextDate")
  .index__routines
    routines-column(type="daily" :dateLabel="displayDate")
    routines-column(type="weekly" :dateLabel="displayWeek")
    routines-column(type="monthly" :dateLabel="displayMonth")
</template>

<script>
import RoutinesColumn from '~/components/RoutinesColumn'
export default {
  components: { RoutinesColumn },
  data () {
    return {
      date: new Date(),
      dailyRoutines: [],
      weeklyRoutines: [],
      monthlyRoutines: []
    }
  },
  computed: {
    displayHeaderDate () {
      return `${this.date.getFullYear()}/${this.date.getMonth() + 1}/${this.date.getDate()}`
    },
    beginingOfWeekDate () {
      return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay())
    },
    endOfWeekDate () {
      return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + (7 - this.date.getDay()))
    },
    displayDate () {
      return `${this.date.getMonth() + 1}/${this.date.getDate()}`
    },
    displayWeek () {
      return `${this.beginingOfWeekDate.getMonth() + 1}/${this.beginingOfWeekDate.getDate()}~${this.endOfWeekDate.getMonth() + 1}/${this.endOfWeekDate.getDate()}`
    },
    displayMonth () {
      return `${this.date.getFullYear()}/${this.date.getMonth() + 1}`
    }
  },
  methods: {
    prevDate () {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1)
    },
    nextDate () {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  padding: 50px
  &__datepicker
    display: flex
    justify-content: space-between
    background-color: lightgray
    border-radius: 8px
    width: 250px
    vertical-align: middle
    margin-bottom: 20px
    .icon
      padding: 3px 0
      width: 30px
      height: 30px
      cursor: pointer
  &__date
    height: 30px
    line-height: 30px
    text-align: center
  &__routines
    display: flex
</style>
