<template lang="pug">
el-card.routine(@click="showingMenu = false")
  .routine__header(slot="header")
    div {{ dateLabel }}
    h2
      span {{ title }}
      el-dropdown.routine__headerDropdown(trigger="click" @command="handleDropdownCommand")
        span
          icon.icon.-hover(name="ellipsis-v")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item.routine__headerDropdownItem(command="create")
            icon.icon(name="plus")
            span Create
          el-dropdown-item.routine__headerDropdownItem(command="edit")
            icon.icon(name="edit")
            span Edit
          el-dropdown-item.routine__headerDropdownItem(command="delete")
            icon.icon(name="trash-alt")
            span Delete
  .routine__body
    collapse-transition
      .routine__createForm(v-if="mode === 'create'")
        routine-create-form(@cancel="clearMode" :type="type" @done="doneCreate")
    .routine__list
      zoom-center-transition(group)
        .routine__item(v-for="routine in routines" :key="routine.id")
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
import { ZoomCenterTransition, CollapseTransition } from 'vue2-transitions'
import RoutineCreateForm from '~/components/RoutineCreateForm'
export default {
  components: { RoutineCreateForm, ZoomCenterTransition, CollapseTransition },
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
    handleDropdownCommand (command) {
      this.mode = command
    },
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
  routineWidth = 350px
  background-color: #fff
  min-width: routineWidth
  width: routineWidth
  margin-right: 15px
  &__header
    position: relative
    h2
      display: flex
      justify-content: space-between
      align-items: center
      .icon
        width: 20px
        height: 20px
    &Dropdown
      position: absolute
      top: 33px
      right: -10px
      &Item
        width: 150px
        &:not(:last-child)
          border-bottom: 1px solid white
        .icon
          width: 15px
          height: 15px
          margin-right: 5px
          vertical-align: text-bottom
  &__body
    height: 400px
    display: flex
    flex-direction: column
  &__createForm
    margin-bottom: 10px
  &__list
    overflow-y: scroll
    background:
      linear-gradient(white 30%, rgba(255, 255, 255, 0)),
      linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
      radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)),
      radial-gradient(farthest-side 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%
    background:
      linear-gradient(white 30%, rgba(255, 255, 255, 0)),
      linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
      radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)),
      radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%
    background-repeat: no-repeat
    background-color: white
    background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px
    background-attachment: local, local, scroll, scroll
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
