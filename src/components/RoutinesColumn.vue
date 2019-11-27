<template lang="pug">
el-card.routine(@click="showingMenu = false")
  .routine__header(slot="header")
    h2.routine__dateLabel {{ dateLabel }}
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
      transition-group(name="routineList"
        @before-enter="el => addDelay(el, 'enter')" @before-leave="el => addDelay(el, 'leave')"
        @after-enter="clearDelay" @enter-cancelled="clearDelay")
        .routine__item(v-for="(routine, i) in routines" :key="routine.id" :data-index="i"
          :class="directionClass")
          .routine__itemCheckbox(@click="doCheck(routine)")
            icon.icon(name="check-square" v-if="routine.achieved")
          .routine__itemContent
            .routine__itemCount
              div.-decrement(v-if="routine.target_count" @click="doDecrement(routine)")
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
    routines: { type: Array, default: () => [] },
    dateChangeDirection: { type: String, default: () => null } // 'prev' | 'next'
  },
  data () {
    return {
      showingMenu: false,
      mode: null, // 'create' | 'edit' | 'delete'
      animateDirection: null, // 'left' | 'right'
      transition: {
        styleTopStore: 0 // for leave transition
      }
    }
  },
  computed: {
    title () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Routines'
    },
    directionClass () {
      const classes = { prev: '-prev', next: '-next' }
      return classes[this.dateChangeDirection]
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
    },
    addDelay (el, type) {
      const offset = 0
      if (type === 'leave') {
        const index = parseInt(el.dataset.index)
        el.style.transitionDelay = 30 * index + 'ms'
        el.style.top = this.transition.styleTopStore + 'px'
        this.transition.styleTopStore += el.clientHeight
      } else if (type === 'enter') {
        el.style.transitionDelay = offset + 30 * parseInt(el.dataset.index) + 'ms'
      }
    },
    clearDelay (el) {
      el.style.transitionDelay = ''
      this.transition.styleTopStore = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.routine
  routineWidth = 280px
  background-color: #fff
  min-width: routineWidth
  width: routineWidth
  margin-right: 15px
  >>>
    .el-card__body
      padding: 10px
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
    position: relative
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
    padding: 5px 0 5px 10px
    checkboxWidth = 20px
    countWidth = 40px
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
      word-wrap: break-word
      width: "calc(100% - %s)" % countWidth
  .routineList
    translateX = 400px
    &-enter-active, &-leave-active
      transition-property: all
      transition-duration: 500ms
    &-leave-active
      position: absolute
    &-leave-to
      &.-next
        transform: translateX(- translateX)
      &.-prev
        transform: translateX(translateX)
    &-enter
      &.-next
        transform: translateX(translateX)
      &.-prev
        transform: translateX(- translateX)
</style>
