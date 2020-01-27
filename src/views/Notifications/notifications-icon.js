import notificationApi from '@/api/controller/notifications'
import Websocket from '@/mixins/Websocket'
import config from '@/config/index'
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationsIcon',
  mixins: [
    Websocket
  ],
  data () {
    return {
      notificationSubscription: null,
      notification: {
        color: 'white',
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
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
  methods: {
    goToNotifications () {
      this.notification.color = 'white'
      if (this.$route.name === 'notifications') {
        window.location.reload()
      } else {
        this.$router.push({ name: 'notifications' })
      }
    },
    notificationSubscriptionCallback: function (data) {
      let parsedData = JSON.parse(data.body)
      this.notification.total = parsedData.data.total
      this.notification.color = 'red'
    }
  },
  created () {
    notificationApi.getTotalUnseen(response => {
      if (response.data.total > 0) {
        this.notification.color = 'red'
        this.notification.total = response.data.total
      }
    }, this.errorHandler)
  },
  destroyed () {
    if (this.notificationSubscription !== null) {
      this.notificationSubscription.unsubscribe()
    }
  }
}
