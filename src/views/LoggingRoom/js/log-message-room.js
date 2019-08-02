import logMessage from '@/views/LoggingRoom/LogMessage'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'log-message-room',
  components: {
    logMessage,
    InfiniteLoading,
    loggingRoomApi,
    BaseTextArea,
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
      messageText: ''
    }
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
        console.log(response)
        this.$toasted.success('success add log')
        this.messageText = ''
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.$route.params.loggingRoomId,
          topicId: this.$route.params.topicId
        },
        body: {
          text: this.messageText
        }
      })
    }

  }
}
