import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'users',
  data () {
    return {
      data: {
        email: '',
        password: ''
      },
      errorAlert: false,
      loggingIn: false
    }
  },
  created () {
    this.checkLoggedIn()
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    }
  },
  methods: {
    ...mapActions([
      'attemptLogin'
    ]),
    checkLoggedIn () {
      if (this.loggedIn) {
        this.$router.push({ query: {} })
      }
    },
    closeLoginModal () {
      this.$router.push({ query: {} })
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
      this.$router.push({
        path: this.$route.query.redirect || '',
        query: {}
      })
    },
    failLogin () {
      setTimeout(this.showFailMessage, 700)
    },
    showFailMessage () {
      this.errorAlert = true
      this.loggingIn = false
    }
  }
}
