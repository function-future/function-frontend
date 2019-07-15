import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserBar',
  data () {
    return {
      isExtend: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    },
    name () {
      return this.currentUser.name || ''
    },
    firstName () {
      return /\s/.test(this.name) ? this.name.substr(0, this.name.indexOf(' ')) : this.name
    }
  },
  methods: {
    ...mapActions([
      'attemptLogout'
    ]),
    extendUserBar: function () {
      this.isExtend = true
    },
    shrinkUserBar: function () {
      this.isExtend = false
    },
    login () {
      if (!this.loggedIn) {
        this.$router.push({ name: 'login' })
      }
    },
    logout () {
      this.attemptLogout({
        callback: this.successAttemptLogout
      })
    },
    successAttemptLogout () {
      this.$cookies.remove('Function-Session')
      this.$router.push({ name: 'login' })
    }
  }
}
