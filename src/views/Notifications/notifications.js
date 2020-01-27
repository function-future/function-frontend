import notificationApi from '@/api/controller/notifications'
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'

export default {
  name: 'Notifications',
  components: {
    InfiniteLoading
  },
  data () {
    return {
      notifications: [],
      page: 1
    }
  },
  methods: {
    infiniteHandler ($state) {
      notificationApi.getNotifications(response => {
        if (response.data.length) {
          if (this.page === 1) {
            this.readNotification(response.data[0].id)
          }
          this.page += 1
          this.notifications.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorHandler, {
        params: {
          page: this.page
        }
      })
    },
    readNotification (notificationId) {
      notificationApi.readNotification(response => {}, this.errorHandler, {
        params: {
          notificationId
        }
      })
    },
    convertClock (epoch) {
      return {
        clock: moment(epoch).format('HH:mm'),
        date: moment(epoch).format('DD MMM YY')
      }
    },
    errorHandler (err) {
      console.log(err)
    }
  }
}
