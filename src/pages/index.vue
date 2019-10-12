<template lang="pug">
.index
  .index__datepicker
    .index__datePrev
    .index__dateNext
</template>

<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
.index
  &__datepicker
    display: flex
</style>
