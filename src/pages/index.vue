<template lang="pug">
el-container.index
  el-aside.index__aside(width="530px")
    Calendar
  el-container
    el-header.index__header
    el-main.index__main
      .index__datepicker
        el-button.elo.-right-cr.-right-bn(icon="el-icon-arrow-left" @click="prevDate" type="primary" plain)
        el-date-picker.elo.-child-cr(
          v-model="localDate"
          :editable="false"
          :clearable="false"
          format="yyyy/MM/dd")
        el-button.elo.-left-cr.-left-bn(icon="el-icon-arrow-right" @click="nextDate" type="primary" plain)
      .index__routines
        routines-column(type="daily" :dateLabel="displayDate" :routines="dailyRoutines"
          :dateChangeDirection="dateChangeDirection" @refetch="fetchResources")
        routines-column(type="weekly" :dateLabel="displayWeek" :routines="weeklyRoutines"
          :dateChangeDirection="dateChangeDirection" @refetch="fetchResources")
        routines-column(type="monthly" :dateLabel="displayMonth" :routines="monthlyRoutines"
          :dateChangeDirection="dateChangeDirection" @refetch="fetchResources")
</template>

<script>
import { mapGetters } from 'vuex'
import RoutinesColumn from '~/components/RoutinesColumn'
import Calendar from '~/components/Calendar'
export default {
  components: { RoutinesColumn, Calendar },
  data () {
    return {
      localDate: new Date(),
      dailyRoutines: [],
      weeklyRoutines: [],
      monthlyRoutines: [],
      dateChangeDirection: null // 'prev' | 'next'
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
      return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + (6 - this.date.getDay()))
    },
    displayDate () {
      return `${this.date.getMonth() + 1}/${this.date.getDate()}`
    },
    displayWeek () {
      return `${this.beginingOfWeekDate.getMonth() + 1}/${this.beginingOfWeekDate.getDate()}~${this.endOfWeekDate.getMonth() + 1}/${this.endOfWeekDate.getDate()}`
    },
    displayMonth () {
      return `${this.date.getFullYear()}/${this.date.getMonth() + 1}`
    },
    ...mapGetters({
      date: 'getDate'
    })
  },
  watch: {
    date (newDate, oldDate) {
      this.fetchResources()
      this.dateChangeDirection = (newDate > oldDate) ? 'next' : 'prev'
      if (this.localDate !== this.date) {
        this.localDate = this.date
      }
    },
    localDate () {
      this.$store.commit('changeDate', this.localDate)
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
    async fetchResources () {
      const dateQuery = `year=${this.date.getFullYear()}&month=${this.date.getMonth() + 1}&date=${this.date.getDate()}`
      const res = await this.$apiClient('get', `http://0.0.0.0:3000/home?${dateQuery}`).catch((err) => { return err.response })
      this.dailyRoutines = res.data.daily_routines
      this.weeklyRoutines = res.data.weekly_routines
      this.monthlyRoutines = res.data.monthly_routines
    },
    prevDate () {
      const prevDate = this.$dayjs(this.localDate).subtract(1, 'day').toDate()
      this.localDate = prevDate
    },
    nextDate () {
      const nextDate = this.$dayjs(this.localDate).add(1, 'day').toDate()
      this.localDate = nextDate
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  height: 100vh
  overflow: hidden
  &__aside
    border-right: 1px solid #eee
    background-color: var(--routeeColorSecondary)
    padding: 10px
  &__header
    border-bottom: 1px solid #eee
    background-color: var(--routeeColorThirdry)
  &__datepicker
    margin-bottom: 20px
    width: 350px
    >>> input
      cursor: pointer
  &__date
    height: 30px
    line-height: 30px
    text-align: center
  &__routines
    display: flex
</style>
