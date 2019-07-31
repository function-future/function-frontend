import SearchBar from '@/components/SearchBar'
import LoggingRoomCard from '@/views/LoggingRoom/LoggingRoomCard'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'

export default {
  name: 'logging-room',
  components: {
    SearchBar,
    LoggingRoomCard,
    InfiniteLoading,
    loggingRoomApi
  },
  data () {
    return {
      loggingRooms: [],
      keyword: '',
      page: 1,
      size: 10
    }
  },
  methods: {
    infiniteHandler ($state) {
      if (!this.keyword) {
        loggingRoomApi.getLoggingRoomsByMember(response => {
          if (this.page === 1) {
            this.loggingRooms = []
          }
          if (response.data.length) {
            this.page += 1
            this.loggingRooms.push(...response.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }, this.getErrorCallback, {
          params: {
            page: this.page,
            size: this.size,
            keyword: this.keyword
          }
        }
        )
      } else {
        $state.complete()
      }
    },
    searchHandler (value) {
      this.page = 1
      this.keyword = value
      loggingRoomApi.getLoggingRoomsByMember(response => {
        this.loggingRooms = response.data
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size,
          keyword: this.keyword
        }
      })
    },
    getErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to get logging room')
    },
    goToLoggingRoomDetail(loggingRoomId) {
      console.log('clicked')
      this.$router.push({
        name: 'loggingRoomDetail',
        params: {
          loggingRoomId : loggingRoomId
        }
      })
    }
  }
}
