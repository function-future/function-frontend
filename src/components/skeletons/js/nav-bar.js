import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'
import notificationApi from '@/api/controller/notifications'
import Websocket from '@/mixins/Websocket'
import config from '@/config/index'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs
  },
  mixins: [
    ChangePageTitleMixins,
    Websocket
  ],
  data () {
    return {
      unreadNotifications: 0,
      notificationPollingInterval: null,
      notificationSubscription: null,
      notification: {
        color: 'white'
      }
    }
  },
  watch: {
    isSocketConnected: function () {
      if (this.isSocketConnected) {
        this.notificationSubscription = this.subscribe(
          config.api.communication.topic.notification(this.currentUser.id),
          this.notificationSubscriptionCallback
        )
      }
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
      return (this.currentUser && this.currentUser.role &&
        this.currentUser.role.substring(0, 1) + this.currentUser.role.slice(1).toLowerCase()) || ''
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
      this.notification.color = 'white'
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
      this.removeNotificationSubscription()
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
    },
    notificationSubscriptionCallback: function (data) {
      let parsedData = JSON.parse(data.body)
      this.notification.color = 'red'
    },
    removeNotificationSubscription: function () {
      this.notificationSubscription.unsubscribe()
      this.notificationSubscription = null
    }
  },
  created () {
    notificationApi.getTotalUnseen(response => {
      if (response.data.total > 0) {
        this.notification.color = 'red'
      }
    }, this.errorHandler)
  },
  destroyed() {
    this.removeNotificationSubscription()
  }
}
