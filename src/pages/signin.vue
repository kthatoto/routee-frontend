<template lang="pug">
.signin
  el-card.signin__card
    .signin__header(slot="header")
      h2 Signin
    el-form.signin__form(label-width="90px" :model="form" ref="form" :rules="rules")
      transition(name="alert")
        el-alert.signin__alert(v-if="alert.showing" @close="alert.showing = false"
          :type="alert.type" :title="alert.message" show-icon)
      el-form-item(label="email" prop="email")
        el-input(v-model="form.email")
      el-form-item(label="password" prop="password")
        el-input(v-model="form.password" type="password")
      el-button.signin__button(@click="signin" type="primary" :loading="form.loading") signin
    .signin__link
      Link(to="/signup") Singup
    .signin__link
      Link(to="/password_reset") Password Reset
    .signin__link(v-if="emailVerified === false")
      el-link(type="primary" @click="sendEmailVerification") Send confirmation mail
</template>

<script>
export default {
  layout: 'beforeSignin',
  meta: { shouldGuest: true },
  data () {
    return {
      form: {
        email: '',
        password: '',
        loading: false
      },
      alert: {
        type: null, // 'error'
        message: '',
        showing: false
      },
      rules: {
        email: [{ required: true }, { type: 'email', trigger: 'blur' }],
        password: [{ required: true }]
      }
    }
  },
  computed: {
    emailVerified () {
      return this.$store.state.user.emailVerified
    }
  },
  created () {
    this.form.email = 'kthatoto@gmail.com'
    this.form.password = 'password'
  },
  methods: {
    clearAlerts () {
      this.alert = { type: null, message: '', showing: false }
    },
    async signin () {
      this.clearAlerts()
      const valid = await this.$refs.form.validate()
      if (!valid) { return }
      this.form.loading = true
      await this.$firebase.auth().signOut()
      const res = await this.$firebase.auth().signInWithEmailAndPassword(
        this.form.email, this.form.password
      ).catch((error) => {
        this.alert = { type: 'error', message: error.message, showing: true }
        this.form.loading = false
      })
      if (!res) { return }
      this.form.loading = false
      this.$router.push('/')
    },
    async sendEmailVerification () {
      if (!this.$firebase.auth().currentUser) { return }
      await this.$firebase.auth().currentUser.sendEmailVerification()
      const email = this.$firebase.auth().currentUser.email
      const style = 'color: black; text-decoration: underline'
      this.$message({
        dangerouslyUseHTMLString: true,
        message: `Sent confirmation mail to <span style="${style}">${email}</span>`,
        type: 'success',
        duration: 0,
        showClose: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
sign-form(signin)
</style>
