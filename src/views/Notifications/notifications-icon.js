import { mapGetters } from 'vuex'
import notificationApi from '@/api/controller/notifications'
import Websocket from '@/mixins/Websocket'
import config from '@/config/index'

export default {
  name: 'NotificationsIcon',
  mixins: [
    Websocket
  ],
  data () {
    return {
      notificationSubscription: null,
      notification: {
        color: 'white'
      }
    }
  },
  watch: {
    loggedIn () {
      if (Object.keys(this.currentUser).length) {
        if (this.isSocketConnected) {
          this.notificationSubscription = this.subscribe(
            config.api.communication.topic.notification(this.currentUser.id),
            this.notificationSubscriptionCallback
          )
        }
      } else {
        if ( this.notificationSubscription != null) {
          this.notificationSubscription.unsubscribe()
        }
        this.notificationSubscription = null
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
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
      this.notification.color = 'red'
    }
  },
  created () {
    notificationApi.getTotalUnseen(response => {
      if (response.data.total > 0) {
        this.notification.color = 'red'
      }
    }, this.errorHandler)
  }
}
