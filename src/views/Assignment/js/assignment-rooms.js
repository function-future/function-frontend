import { mapActions, mapGetters } from 'vuex'
import BasePagination from '@/components/BasePagination'
import config from '@/config'

export default {
  name: 'AssignmentRooms',
  components: {
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      rooms: []
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'roomList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchRoomList'
    ]),
    initPage () {
      this.fetchRoomList({
        data: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingRoomList,
        fail: this.failFetchingRoomList
      })
    },
    successFetchingRoomList (response, paging) {
      this.paging = paging
      this.rooms = [ ...response ]
    },
    failFetchingRoomList () {
      this.$toasted.error('Something went wrong while fetching room list')
    },
    goToRoomDetail (room) {
      this.$router.push({
        name: 'assignmentRoomDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          studentId: room.id
        }
      })
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.initPage()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.initPage()
    }
  }
}
