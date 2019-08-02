import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import TopicCard from '@/views/LoggingRoom/TopicCard'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'

export default {
  name: 'logging-room-detail',
  components: {
    ParticipantCard,
    TopicCard,
    loggingRoomApi,
    InfiniteLoading
  },
  data () {
    return {
      topics: [],
      page: 1,
      size: 10,
      loggingRoom: {}
    }
  },
  methods: {
    infiniteHandler ($state) {
      loggingRoomApi.getLoggingRoomTopic(response => {
        if (this.page === 1) {
          this.topics = []
        }
        if (response.data.length) {
          this.page += 1
          this.topics.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorCallBack, {
        params: {
          page: this.page,
          size: this.size,
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    },
    errorCallBack (err) {
      console.log(err)
      this.$toasted.error('Something Error')
    },
    goToLoggingRoom (topicId) {
      this.$router.push({
        name: 'logMessage',
        params: {
          loggingRoomId: this.$route.params.loggingRoomId,
          topicId: topicId
        }
      })
    },
    setLoggingRoom () {
      loggingRoomApi.getLoggingRoom(response => {
        this.loggingRoom = response.data
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    }
  },
  created () {
    this.setLoggingRoom()
  }
}
