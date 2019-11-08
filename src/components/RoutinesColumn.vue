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
  .routine__list
    routine-create-form(v-if="mode === 'create'" @cancel="clearMode" :type="type" @done="doneCreate")
    .routine__item(v-for="routine in routines")
      .routine__itemCheckbox(@click="doCheck(routine)")
        icon.icon(name="check-square" v-if="routine.achieved")
      .routine__itemContent
        .routine__itemCount
          div.-decrement(v-if="routine.target_count" @click="doDecrement(routine)")
            icon.icon(name="check-square")
            span {{ routine.count }}/{{ routine.target_count }}
        .routine__itemName {{ routine.name }}
</template>

<script>
import RoutineCreateForm from '~/components/RoutineCreateForm'
export default {
  components: { RoutineCreateForm },
  props: {
    type: { type: String, required: true }, // 'daily' | 'weekly' | 'monthly'
    dateLabel: { type: String, required: true },
    routines: { type: Array, default: () => [] }
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
    },
    doneCreate () {
      this.mode = null
      this.$emit('refetch')
    },
    async doCheck (routine) {
      const res = await this.$apiClient('patch', `http://0.0.0.0:3000/routines/${routine.id}/toggle_achieved`)
      if (res.status === 200) {
        this.$emit('refetch')
      }
    },
    async doDecrement (routine) {
      const res = await this.$apiClient('patch', `http://0.0.0.0:3000/routines/${routine.id}/decrement`)
      if (res.status === 200) {
        this.$emit('refetch')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.routine
  background-color: lightgray
  min-width: 300px
  width: 300px
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
  &__list
    overflow-y: scroll
    height: 450px
    max-height: 450px
  &__item
    display: flex
    padding: 5px 0
    checkboxWidth = 30px
    countWidth = 50px
    &Checkbox
      border: 2px solid black
      border-radius: 5px
      width: checkboxWidth
      height: checkboxWidth
      background-color: white
      cursor: pointer
      position: relative
      .icon
        width: checkboxWidth
        height: checkboxWidth
        position: absolute
        top: -2px
        left: -2px
    &Content
      width: "calc(100% - %s)" % checkboxWidth
      padding-left: 5px
      display: flex
    &Count
      width: countWidth
      padding-top: 5px
      .icon
        margin-right: 4px
        vertical-align: text-bottom
      span
        font-size: 10px
        vertical-align: text-bottom
      .-decrement
        cursor: pointer
    &Name
      padding-top: 3px
      word-wrap: break-word
      width: "calc(100% - %s)" % countWidth
</style>
