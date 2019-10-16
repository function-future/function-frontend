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
      this.$router.push({ name: 'profile' })
    },
    goToChangePassword () {
      this.$router.push({ name: 'changePassword' })
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
