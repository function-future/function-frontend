import SearchBar from '@/components/SearchBar'
import LoggingRoomCard from '@/views/LoggingRoom/LoggingRoomCard'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'logging-room',
  components: {
    SearchBar,
    LoggingRoomCard,
    InfiniteLoading,
    loggingRoomApi,
    BaseButton,
    ModalDeleteConfirmation
  },
  data () {
    return {
      loggingRooms: [],
      keyword: '',
      page: 1,
      size: 10,
      modalDeleteConfirmation: {
        show: false,
        title: '',
        id: ''
      }
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
          loggingRoomId: loggingRoomId
        }
      })
    },
    goToCreate () {
      this.$router.push({
        name: 'loggingRoomCreate'
      })
    },
    editLoggingRoom (id) {
      alert('test')
      this.$router.push({
        name: 'loggingRoomEdit',
        params: {
          loggingRoomId: id
        }
      })
    },
    openDeleteModal (loggingRoom) {
      this.modalDeleteConfirmation.show = true
      this.modalDeleteConfirmation.id = loggingRoom.id
      this.modalDeleteConfirmation.title = loggingRoom.title
    },
    resetDeleteModal () {
      this.modalDeleteConfirmation.show = false
      this.modalDeleteConfirmation.id = ''
      this.modalDeleteConfirmation.title = ''
    },
    deleteLoggingRoom () {
      loggingRoomApi.deleteLoggingRoom(response => {
        this.$toasted.success('success delete loggingRoom')
        this.resetDeleteModal()
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.modalDeleteConfirmation.id
        }
      })
    }
  }
}
