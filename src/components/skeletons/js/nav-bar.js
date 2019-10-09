import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import BaseTitle from '@/components/BaseTitle'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'
import notificationApi from '@/api/controller/notifications'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs,
    BaseTitle
  },
  mixins: [
    ChangePageTitleMixins
  ],
  data () {
    return {
      unreadNotifications: 0,
      notificationPollingInterval: null
    }
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ]),
    loggedIn () {
      if (Object.keys(this.currentUser).length) {
        this.startPolling()
        return true
      } else {
        this.stopPolling()
        return false
      }
    },
    name () {
      return this.currentUser.name || ''
    },
    firstName () {
      return /\s/.test(this.name) ? this.name.substr(0, this.name.indexOf(' ')) : this.name
    },
    role () {
      return 'role'
    }
  },
  methods: {
    ...mapActions([
      'attemptLogout'
    ]),
    startPolling () {
      if (!this.notificationPollingInterval) {
        this.notificationPollingInterval = setInterval(this.notificationPollingHandler, 2000)
      }
    },
    stopPolling () {
      clearInterval(this.notificationPollingInterval)
      this.notificationPollingInterval = null
    },
    login () {
      if (!this.loggedIn) {
        this.$router.push({ query: { auth: 'login' } })
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
      }, this.errorHandler)
    }
  }
}
