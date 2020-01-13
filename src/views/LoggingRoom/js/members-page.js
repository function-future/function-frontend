import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import loggingRoomApi from '@/api/controller/logging-room'

export default {
  name: 'members-page',
  components: {
    ParticipantCard
  },
  data () {
    return {
      loggingRoom: {}
    }
  },
  props: {
    iconMenu: {
      type: String,
      default: 'plus'
    },
    iconTitle: {
      type: String,
      default: 'Title'
    }
  },
  methods: {
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
