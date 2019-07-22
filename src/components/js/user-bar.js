import { mapGetters, mapActions } from 'vuex'
import notificationApi from '@/api/controller/notifications'

export default {
  name: 'UserBar',
  data () {
    return {
      isExtend: '',
      unreadNotifications: 0,
      notificationPollingInterval: null
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    loggedIn () {
      if (Object.keys(this.currentUser).length) {
        this.notificationPollingInterval = setInterval(this.notificationPollingHandler, 2000)
        return true
      } else {
        clearInterval(this.notificationPollingInterval)
        return false
      }
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
      if (this.loggedIn) {
        this.isExtend = true
      }
    },
    shrinkUserBar: function () {
      if (this.loggedIn) {
        this.isExtend = false
      }
    },
    login () {
      if (!this.loggedIn) {
        this.$router.push({ name: 'login' })
      }
    },
    goToNotifications () {
      if (this.$route.name === 'notifications') {
        window.location.reload()
      } else {
        this.$router.push({ name: 'notifications' })
      }
    },
    logout () {
      this.attemptLogout({
        callback: this.successAttemptLogout
      })
    },
    successAttemptLogout () {
      this.$cookies.remove('Function-Session')
      this.$router.push({ name: 'feeds' })
      this.isExtend = false
    },
    goToProfile () {
      this.$router.push({ name: 'profile' })
    },
    errorHandler (err) {
      console.log(err)
    },
    notificationPollingHandler () {
      notificationApi.getTotalUnseen(response => {
        this.unreadNotifications = response.data.total
      }, this.errorHandler
      )
    }
  }
}
