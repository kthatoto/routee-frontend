<template lang="pug">
div
  calendar-view.calendar(:showDate="showDate" :events="events"
    @click-date="onClickDate"
    current-period-label="Today")
    calendar-view-header.calendar__header(slot="header" slot-scope="{ headerProps }"
      @input="setShowDate" :header-props="headerProps")
    .calendar__dayContent(slot="dayContent" slot-scope="{ day }")
      h1 {{ day.getDate() }}
      h1(v-if="today(day)") Today!!
  el-calendar
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
        { startDate: new Date(2019, 10, 3), title: 'hey!' }
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
    today (date) {
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
  &__header
    border-bottom: 1px solid borderColor
    >>>
      .nextYear, .previousYear
        display: none
</style>
