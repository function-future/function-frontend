import { mapActions, mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'AssignmentRooms',
  data () {
    return {

    }
  },
  created () {
    this.fetchRoomList({
      data: {
        batchCode: '3',
        assignmentId: 'ASG0001',
        page: 1,
        pageSize: 10
      },
      fail: this.failFetchingRoomList
    })
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
    failFetchingRoomList () {
      this.$toasted.error('Something went wrong while fetching room list')
    },
    goToRoomDetail (room) {
      // this.$router.push(config.app.pages.assignments.rooms.detail({
      //   name: 'assignmentRoomDetail',
      //   params: {
      //     id: room.assignment.id,
      //     roomId: room.id
      //   }
      // }))
      alert('Should push to ' + room.id)
      // TODO add the actual after api-mock is updated and add the component for assginmentRoomDetail
    }
  }
}
