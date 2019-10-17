<template lang="pug">
.index
  .index__datepicker
    icon.icon.-hover(name="chevron-left" @click.native="prevDate")
    .index__date {{ displayHeaderDate }}
    icon.icon.-hover(name="chevron-right" @click.native="nextDate")
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
  async asyncData ({ app, error }) {
    const date = new Date()
    const dateQuery = `year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`
    const res = await app.apiClient('get', `http://0.0.0.0:3000/home?${dateQuery}`).catch((err) => { return err.response })
    return {
      dailyRoutines: res.data.daily_routines,
      weeklyRoutines: res.data.weekly_routines,
      monthlyRoutines: res.data.monthly_routines
    }
  },
  methods: {
    prevDate () {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1)
    },
    nextDate () {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1)
    },
    async fetchResources () {
      const dateQuery = `year=${this.date.getFullYear()}&month=${this.date.getMonth() + 1}&date=${this.date.getDate()}`
      const res = await this.$apiClient('get', `http://0.0.0.0:3000/home?${dateQuery}`).catch((err) => { return err.response })
      this.dailyRoutines = res.data.daily_routines
      this.weeklyRoutines = res.data.weekly_routines
      this.monthlyRoutines = res.data.monthly_routines
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
  &__date
    height: 30px
    line-height: 30px
    text-align: center
  &__routines
    display: flex
</style>
