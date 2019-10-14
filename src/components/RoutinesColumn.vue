<template lang="pug">
.routine(@click="showingMenu = false")
  .routine__header
    div {{ dateLabel }}
    h2
      span {{ title }}
      span(@click.stop)
        icon.icon.-hover(name="ellipsis-v" @click.native="showingMenu = !showingMenu")
    .routine__headerMenu(v-show="showingMenu")
      .routine__headerMenuItem.-hover(@click="mode = 'create'")
        icon.icon(name="plus")
        span Create
      .routine__headerMenuItem.-hover(@click="mode = 'edit'")
        icon.icon(name="edit")
        span Edit
      .routine__headerMenuItem.-hover(@click="mode = 'delete'")
        icon.icon(name="trash-alt")
        span Delete
  routine-create-form(v-if="mode === 'create'" @cancel="clearMode")
</template>

<script>
import RoutineCreateForm from '~/components/RoutineCreateForm'
export default {
  components: { RoutineCreateForm },
  props: {
    type: { type: String, required: true }, // 'daily' | 'weekly' | 'monthly'
    dateLabel: { type: String, required: true }
  },
  data () {
    return {
      showingMenu: false,
      mode: null // 'create' | 'edit' | 'delete'
    }
  },
  computed: {
    title () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Routines'
    }
  },
  methods: {
    clearMode () {
      this.mode = null
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
    margin-bottom: 10px
    h2
      display: flex
      justify-content: space-between
      align-items: center
      .icon
        width: 20px
        height: 20px
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
        .icon
          width: 15px
          height: 15px
          margin-right: 5px
</style>
