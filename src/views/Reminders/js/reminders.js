import ReminderCard from '@/views/Reminders/ReminderCard'
import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import InfiniteLoading from 'vue-infinite-loading'
import reminderApi from '@/api/controller/reminders'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import EmptyState from '@/components/emptyState/EmptyState'
import Breakpoint from '@/mixins/Breakpoint'
import { mapActions } from 'vuex'

export default {
  name: 'Reminders',
  components: {
    SearchBar,
    BaseButton,
    ReminderCard,
    InfiniteLoading,
    ModalDeleteConfirmation,
    EmptyState
  },
  mixins: [
    Breakpoint
  ],
  data () {
    return {
      reminders: [],
      keyword: '',
      page: 1,
      showDeleteConfirmation: false,
      reminderIdForRemove: ''
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
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
      this.toast({
        data: {
          message: 'Something went wrong',
          type: 'is-danger'
        }
      })
    },
    removeHandler (reminderId) {
      this.reminderIdForRemove = reminderId
      this.showDeleteConfirmation = true
    },
    deleteReminder () {
      this.showDeleteConfirmation = false
      reminderApi.deleteReminder(response => {
        this.toast({
          data: {
            message: 'Reminder has been successfully deleted',
            type: 'is-success'
          }
        })
        this.reminders = []
        this.page = 1
        this.reminderIdForRemove = ''
        if (this.keyword) {
          this.searchHandler(this.keyword)
        } else {
          this.$refs.infiniteLoading.stateChanger.reset()
        }
      }, this.errorCallback, {
        params: {
          reminderId: this.reminderIdForRemove
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
