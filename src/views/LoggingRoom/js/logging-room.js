import SearchBar from '@/components/SearchBar'
import LoggingRoomCard from '@/views/LoggingRoom/LoggingRoomCard'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'logging-room',
  components: {
    SearchBar,
    LoggingRoomCard,
    InfiniteLoading
  },
  methods: {
    infiniteHandler () {
      // doing infinite load
    }
  }
}
