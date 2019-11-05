import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'account',
  created () {
    this.checkLoggedIn()
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    },
    role () {
      return (this.currentUser && this.currentUser.role &&
        this.currentUser.role.substring(0, 1) + this.currentUser.role.slice(1).toLowerCase()) || ''
    }
  },
  methods: {
    ...mapActions([
      'attemptLogout'
    ]),
    checkLoggedIn () {
      if (!this.loggedIn) {
        this.$router.push({
          name: 'feeds',
          query: {
            auth: 'login',
            redirect: '/account'
          }
        })
      }
    },
    goToProfile () {
      this.$router.push({ name: 'profileMobile' })
    },
    goToChangePassword () {
      this.$router.push({ name: 'changePasswordMobile' })
    },
    logout () {
      this.attemptLogout({
        callback: this.successAttemptLogout
      })
    },
    successAttemptLogout () {
      this.$router.push({ name: 'feeds' })
    }
  }
}
