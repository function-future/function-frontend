import logMessage from '@/views/LoggingRoom/LogMessage'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'log-message-room',
  components: {
    logMessage,
    InfiniteLoading,
    loggingRoomApi,
    BaseButton,
    BaseInput
  },
  props: {
    title: {
      type: String,
      default: 'Future Batch 3 Progress'
    }
  },
  data () {
    return {
      logMessages: [],
      page: 1,
      size: 10,
      messageText: '',
      currentDateMessage: null
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  methods: {
    infiniteHandler ($state) {
      loggingRoomApi.getLogMessages(response => {
        if (this.page === 1) {
          this.logMessages = []
        }
        if (response.data.length) {
          this.page += 1
          this.logMessages.unshift(...response.data.reverse())
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorCallBack, {
        params: {
          page: this.page,
          size: this.size,
          loggingRoomId: this.$route.params.loggingRoomId,
          topicId: this.$route.params.topicId
        }
      })
    },
    errorCallBack (err) {
      console.log(err)
      this.$toasted.error('Something Error')
    },
    submitMessage () {
      loggingRoomApi.createLogMessage(response => {
        this.$toasted.success('success add log')
        this.messageText = ''
        this.page = 1
        this.logMessages = []
        this.$refs.infiniteLoading.stateChanger.reset()
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.$route.params.loggingRoomId,
          topicId: this.$route.params.topicId
        },
        body: {
          text: this.messageText
        }
      })
    },
    computedLogMessagesDate (messages) {
      let dateSeparator = null
      messages.forEach(message => {
        if (!dateSeparator) {
          message.isNewDate = true
        } else if (moment(this.toDateList(message.createdAt)).diff(this.toDateList(dateSeparator), 'days') >= 1) {
          message.isNewDate = true
        } else {
          message.isNewDate = false
        }
        dateSeparator = message.createdAt
      })
      return messages
    },
    toDateList (time) {
      return [moment(time).year(), moment(time).month(), moment(time).date()]
    },
    printDateSeparator (message) {
      let diffDayWithNow = moment(this.toDateList(Date.now()))
        .diff(this.toDateList(message.createdAt), 'days')
      if (diffDayWithNow < 1) {
        return 'Today'
      } else if (diffDayWithNow < 2) {
        return 'Yesterday'
      } else {
        return moment(message.createdAt).format('DD MMM YY')
      }
    },
    submitMessageButton (event) {
      if (event.keyCode === 13 && this.messageText.length) {
        this.submitMessage()
      }
    }
  }
}