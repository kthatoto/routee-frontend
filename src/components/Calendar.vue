<template lang="pug">
.calendar
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      date: 'getDate'
    })
  }
}
</script>
