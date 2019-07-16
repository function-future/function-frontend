import { mapActions, mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'AssignmentRooms',
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
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
    successFetchingRoomList (paging) {
      this.paging = paging
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
          roomId: room.id
        }
      })
    }
  }
}
