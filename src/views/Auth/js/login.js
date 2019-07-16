import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'users',
  components: {
    BaseInput,
    BaseButton
  },
  data () {
    return {
      data: {
        email: '',
        password: ''
      },
      errorAlert: '',
      loggingIn: false,
      loginSuccess: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.push({
        name: 'login',
        query: { redirect: from.fullPath }
      })
    })
  },
  methods: {
    ...mapActions([
      'attemptLogin'
    ]),
    back () {
      this.$router.push({ name: 'feeds' })
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
          return
        }
        this.loggingIn = false
      })
    },
    login () {
      this.loggingIn = true
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.attemptLogin({
        data: { ...this.data },
        callback: this.successLogin,
        fail: this.failLogin
      })
    },
    successLogin () {
      this.loginSuccess = true
      setTimeout(this.redirectAfterLogin, 700)
    },
    redirectAfterLogin () {
      this.$router.push({ path: this.$route.query.redirect })
    },
    failLogin () {
      setTimeout(this.showFailMessage, 700)
    },
    showFailMessage () {
      this.errorAlert = 'You have entered an invalid email or password'
      this.loggingIn = false
    }
  }
}
