<template lang="pug">
.routine(@click="showingMenu = false")
  .routine__header
    div {{ dateLabel }}
    h2
      span {{ title }}
      span(@click.stop)
        icon.icon(name="ellipsis-v" @click.native="showingMenu = !showingMenu")
    .routine__headerMenu(v-show="showingMenu")
      .routine__headerMenuItem Create
      .routine__headerMenuItem Edit
      .routine__headerMenuItem Delete
</template>

<script>
export default {
  props: {
    type: { type: String, required: true }, // 'daily' | 'weekly' | 'monthly'
    dateLabel: { type: String, required: true }
  },
  data () {
    return {
      showingMenu: false
    }
  },
  computed: {
    title () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Routines'
    }
  }
}
</script>

<style lang="stylus" scoped>
.routine
  background-color: lightgray
  min-width: 300px
  width: 300px
  height: 500px
  margin-right: 15px
  padding: 10px
  border-radius: 5px
  &__header
    position: relative
    padding-bottom: 5px
    border-bottom: 1px solid gray
    h2
      display: flex
      justify-content: space-between
      align-items: center
      .icon
        width: 20px
        height: 20px
        cursor: pointer
    &Menu
      position: absolute
      top: 100%
      right: -10px
      background-color: gray
      &Item
        width: 100px
        color: white
        margin: 0 5px
        padding: 5px 2px
        &:not(:last-child)
          border-bottom: 1px solid white
</style>
