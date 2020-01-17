<template lang="pug">
el-card.create
  el-form.create__form(label-width="95px" :model="form" ref="form" :rules="rules")
    el-form-item(label="count")
      el-switch.create__countSwitch(v-model="form.countActive")
      el-input-number.create__countInput(v-model="form.count" :disabled="!form.countActive" size="mini" :min="1")
    el-form-item(label="name" prop="name" :error="errors.name")
      el-input(v-model="form.name")
    el-form-item(label="description")
      el-input(type="textarea" v-model="form.description")
    el-form-item(:label="`start ${dateTypeSlug}`" prop="startDate")
      el-date-picker.create__datepicker(v-model="form.startDate" :clearable="false" :editable="false"
        :type="dateTypeSlug" :format="datepickerFormat")
    el-form-item(:label="`end ${dateTypeSlug}`" prop="endDate" :error="errors.endDate")
      el-date-picker.create__datepicker(v-model="form.endDate" :editable="false"
        :type="dateTypeSlug" :format="datepickerFormat")
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
        description: '',
        startDate: null,
        endDate: null
      },
      rules: {
        name: { required: true },
        startDate: { type: 'date', required: true, message: 'start date is required' }
      },
      errors: {
        name: null,
        endDate: null
      }
    }
  },
  computed: {
    formattedStartDate () {
      return this.form.startDate ? this.$dayjs(this.form.startDate).format('YYYY-MM-DD') : null
    },
    formattedEndDate () {
      return this.form.endDate ? this.$dayjs(this.form.endDate).format('YYYY-MM-DD') : null
    },
    dateTypeSlug () {
      return { daily: 'date', weekly: 'week', monthly: 'month' }[this.type]
    },
    datepickerFormat () {
      return { daily: 'yyyy-MM-dd', weekly: 'yyyy-MM-dd', monthly: 'yyyy-MM' }[this.type]
    },
    ...mapGetters({
      date: 'getDate'
    })
  },
  watch: {
    'form.countActive' () {
      if (!this.form.countActive) {
        this.form.count = 1
      }
    },
    'form.startDate' () {
      this.adjustDatesToType('start')
    },
    'form.endDate' () {
      this.adjustDatesToType('end')
    }
  },
  created () {
    this.form.startDate = new Date()
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    adjustDatesToType (dateName) {
      if (this.type === 'weekly' || this.type === 'monthly') {
        const beforeDate = this.form[`${dateName}Date`]
        const adjustedDate = this.$dayjs(beforeDate)[`${dateName}Of`](this.dateTypeSlug).toDate()
        if (!this.$dayjs(beforeDate).isSame(this.$dayjs(adjustedDate))) {
          this.form[`${dateName}Date`] = adjustedDate
        }
      }
    },
    clearErrors () {
      this.errors.name = null
      this.errors.endDate = null
    },
    customValidate () {
      if (this.form.endDate && this.form.startDate > this.form.endDate) {
        this.errors.endDate = 'end date must be before start date'
      }
      return Object.values(this.errors).every(v => v === null)
    },
    async submit () {
      this.clearErrors()
      const valid = await this.$refs.form.validate()
      const customValid = await this.customValidate()
      if (!(valid && customValid)) { return }
      this.$apiClient('post',
        '/routines',
        {
          interval_type: this.type,
          count: this.form.count,
          name: this.form.name,
          description: this.form.description,
          start_date: this.formattedStartDate,
          end_date: this.formattedEndDate
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
    &Input
      width: 90px
  &__buttons
    display: flex
    justify-content: flex-end
  &__datepicker
    width: 100%
  >>>
   .el-card__body
     padding: 10px
</style>
