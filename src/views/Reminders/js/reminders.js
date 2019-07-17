import ReminderCard from '@/views/Reminders/ReminderCard'
import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import InfiniteLoading from 'vue-infinite-loading'
import reminderApi from '@/api/controller/reminders'

export default {
  name: 'Reminders',
  components: {
    SearchBar,
    BaseButton,
    ReminderCard,
    InfiniteLoading
  },
  data () {
    return {
      reminders: [],
      keyword: '',
      page: 1
    }
  },
  methods: {
    infiniteHandler ($state) {
      if (!this.keyword) {
        reminderApi.getReminders(response => {
          if (this.page === 1) {
            this.reminders = []
          }
          if (response.data.length) {
            this.page += 1
            this.reminders.push(...response.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }, this.errorCallback, {
          params: {
            page: this.page,
            keyword: this.keyword
          }
        })
      } else {
        $state.complete()
      }
    },
    searchHandler (value) {
      this.page = 1
      this.keyword = value
      reminderApi.getReminders(response => {
        this.reminders = response.data
      }, this.errorCallback, {
        params: {
          page: this.page,
          keyword: this.keyword
        }
      })
    },
    errorCallback (err) {
      console.log(err)
    },
    removeHandler (reminderId) {
      reminderApi.deleteReminder(response => {
        this.$toasted.success('Reminder has been successfully deleted')
        this.reminders = []
        this.page = 1
        if (this.keyword) {
          this.searchHandler(this.keyword)
        } else {
          this.$refs.infiniteLoading.stateChanger.reset()
        }
      }, this.errorCallback, {
        params: {
          reminderId
        }
      })
    },
    createHandler () {
      this.resetState()
      this.$router.push({ name: 'reminderCreate' })
    },
    detailHandler (reminderId) {
      this.resetState()
      this.$router.push({ name: 'reminderDetail', params: { reminderId } })
    },
    resetState () {
      this.reminders = []
      this.page = 1
      this.keyword = ''
    }
  }
}
