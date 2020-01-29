import loggingRoomCreate from '@/views/LoggingRoom/LoggingRoomCreate'
import loggingRoomApi from '@/api/controller/logging-room'
import { mapActions } from 'vuex'

export default {
  name: 'logging-room-edit',
  components: {
    loggingRoomCreate
  },
  data () {
    return {
      title: '',
      description: '',
      members: []
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    errorCallBack (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'something error',
          type: 'is-danger'
        }
      })
    }
  },
  mounted () {
    loggingRoomApi.getLoggingRoom(response => {
      console.log(response)
      this.title = response.data.title
      this.description = response.data.description
      this.members = response.data.members
    }, this.errorCallBack, {
      params: {
        loggingRoomId: this.$route.params.loggingRoomId
      }
    })
  }
}
