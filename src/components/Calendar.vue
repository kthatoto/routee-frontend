<template lang="pug">
calendar-view.calendar(:showDate="date" :events="events")
  div(slot="dayContent" slot-scope="{ day }")
    h1 {{ day.getDate() }}
    h1(v-if="today(day)") Today!!
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView } from 'vue-simple-calendar'
export default {
  components: { CalendarView },
  data () {
    return {
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
  methods: {
    today (date) {
      return this.$dayjs(this.date).isSame(this.$dayjs(date), 'date')
    }
  }
}
</script>
