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
  .routine__create
    .routine__createCheckbox
    .routine__createForm
      .routine__createFormTop
        .routine__createCount
          .routine__createCountLabel count
          .routine__createCountButton.-hover(:class="{'-active': create.countActive}"
            @click="create.countActive = !create.countActive")
              .routine__createCountButtonCircle(:class="{'-active': create.countActive}")
          input.routine__createCountInput(v-model="create.count" :disabled="!create.countActive" type="number")
        .routine__createTitle
          .routine__createTitleLabel title
          input.routine__createTitleInput(v-model="create.title")
</template>

<script>
export default {
  props: {
    type: { type: String, required: true }, // 'daily' | 'weekly' | 'monthly'
    dateLabel: { type: String, required: true }
  },
  data () {
    return {
      showingMenu: false,
      mode: null, // 'create' | 'edit' | 'delete'
      create: {
        countActive: false,
        count: 1,
        title: ''
      }
    }
  },
  computed: {
    title () {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1) + ' Routines'
    }
  },
  watch: {
    'create.countActive' () {
      if (!this.create.countActive) {
        this.create.count = 1
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
  &__create
    display: flex
    padding: 5px 0
    &Checkbox
      border: 2px solid black
      border-radius: 5px
      width: 30px
      height: 30px
      background-color: white
      cursor: pointer
    &Form
      width: calc(100% - 30px)
      padding-left: 15px
      &Top
        display: flex
    &Count
      margin-right: 10px
      &Label
        font-size: 11px
        width: 30px
        text-align: center
      &Button
        background-color: white
        width: 30px
        height: 18px
        border-radius: 9px
        position: relative
        &.-active
          background-color: deepskyblue
        &Circle
          background-color: white
          border: 1px solid #e2e2e2
          width: 16px
          height: 16px
          border-radius: 7px
          position: absolute
          top: 1px
          left: 1px
          &.-active
            left: unset
            right: 1px
      &Input
        width: 30px
        border: none
        background-color: white
        padding: 2px 3px
        &[disabled=disabled]
          color: gray
          background-color: #eee
    &Title
      &Label
        font-size: 11px
      &Input
        border: none
        height: 40px
        width: 100%
        padding: 7px
        font-size: 16px
</style>
