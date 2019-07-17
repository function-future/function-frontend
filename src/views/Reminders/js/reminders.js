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
            this.reminders.push(...response.data)
            this.page += 1
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
    }
  }
}
