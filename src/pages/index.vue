<template lang="pug">
.index
  .index__datepicker
    icon.icon(name="chevron-left")
    .index__date {{ displayDate }}
    icon.icon(name="chevron-right")
</template>

<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  computed: {
    displayDate () {
      return `${this.date.getFullYear()}/${this.date.getMonth() + 1}/${this.date.getDate()}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  &__datepicker
    display: flex
</style>
