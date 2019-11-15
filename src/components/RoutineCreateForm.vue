<template lang="pug">
el-card.create
  el-form.create__form(label-width="90px" :model="form" ref="form" :rules="rules")
    el-form-item(label="count")
      el-switch.create__countSwitch(v-model="form.countActive")
      el-input-number(v-model="form.count" :disabled="!form.countActive" size="mini" :min="1")
    el-form-item(label="name" prop="name" :error="errors.name")
      el-input(v-model="form.name")
    el-form-item(label="description")
      el-input(type="textarea" v-model="form.description")
    .create__buttons
      el-button(@click="cancel")
        icon.icon.-l(name="ban")
        span cancel
      el-button(@click="submit" type="success")
        icon.icon.-l(name="plus")
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
      form: {
        countActive: false,
        count: 1,
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: 'Name is required' }
        ]
      },
      errors: {
        name: null
      }
    }
  },
  computed: {
    ...mapGetters({
      date: 'getDate'
    })
  },
  watch: {
    'form.countActive' () {
      if (!this.form.countActive) {
        this.form.count = 1
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    async submit () {
      const valid = await this.$refs.form.validate()
      if (!valid) { return }
      this.errors.name = null
      this.$apiClient('post',
        'http://0.0.0.0:3000/routines',
        {
          interval_type: this.type,
          count: this.form.count,
          name: this.form.name,
          description: this.form.description,
          year: this.date.getFullYear(),
          month: this.date.getMonth() + 1,
          date: this.date.getDate()
        }
      ).then(() => {
        this.$emit('done')
      }).catch((err) => {
        if (err.response.status === 409) {
          this.errors.name = 'The name is already used'
        } else {
          alert('Something error')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  &__count
    &Switch
      margin-right: 10px
  &__buttons
    display: flex
    justify-content: flex-end
</style>
