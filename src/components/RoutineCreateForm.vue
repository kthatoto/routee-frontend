<template lang="pug">
el-card.create
  .create__form
    .create__formTop
      .create__count
        .create__countLabel count
        .create__countButton.-hover(:class="{'-active': countActive}"
          @click="countActive = !countActive")
            .create__countButtonCircle(:class="{'-active': countActive}")
        input.create__countInput(v-model="count" :disabled="!countActive")
      .create__name
        .create__nameLabel name
        input.create__nameInput(v-model="name")
    .create__formBottom
      .create__description
        .create__descriptionLabel description
        textarea.create__descriptionInput(v-model="description")
    .create__formButtons
      .create__formButtonsItem.-hover(@click="cancel")
        icon.icon(name="ban")
        span cancel
      .create__formButtonsItem.-hover.-create(@click="submit")
        icon.icon(name="plus")
        span create
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    type: { type: String, required: true } // 'daily' | 'weekly' | 'monthly'
  },
  data () {
    return {
      countActive: false,
      count: 1,
      name: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      date: 'getDate'
    })
  },
  watch: {
    countActive () {
      if (!this.countActive) {
        this.count = 1
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$apiClient('post',
        'http://0.0.0.0:3000/routines',
        {
          interval_type: this.type,
          count: this.count,
          name: this.name,
          description: this.description,
          year: this.date.getFullYear(),
          month: this.date.getMonth() + 1,
          date: this.date.getDate()
        }
      ).then((res) => {
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  &__form
    &Top
      display: flex
      margin-bottom: 5px
    &Bottom
      margin-bottom: 5px
    &Buttons
      display: flex
      justify-content: flex-end
      &Item
        width: 100px
        background-color: white
        padding: 5px
        text-align: center
        margin-left: 10px
        border-radius: 4px
        &.-create
          background-color: palegreen
        .icon
          vertical-align: text-bottom
          margin-right: 5px
  &__count
    margin-right: 10px
    width: 30px
    &Label
      font-size: 11px
      width: 100%
      text-align: center
    &Button
      background-color: white
      width: 100%
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
      width: 100%
      border: none
      background-color: white
      padding: 2px 3px
      &[disabled=disabled]
        color: gray
        background-color: #eee
  &__name
    width: calc(100% - 40px)
    &Label
      font-size: 11px
    &Input
      border: none
      width: 100%
      height: 40px
      padding: 7px
      font-size: 16px
  &__description
    &Label
      font-size: 11px
    &Input
      width: 100%
      border: none
      padding: 5px
      font-size: 14px
      height: 40px
</style>
