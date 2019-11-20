<template lang="pug">
calendar-view.calendar(:events="events")
  calendar-view-day-content(slot="dayContent" slot-scope="{ day }")
    h1 {{ day.getDate() }}
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView, CalendarViewDayContent } from 'vue-simple-calendar'
export default {
  components: { CalendarView, CalendarViewDayContent },
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
  }
}
</script>
