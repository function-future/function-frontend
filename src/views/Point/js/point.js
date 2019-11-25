import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import UserListItem from '@/components/list/UserListItem'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Point',
  components: {
    UserListItem,
    ListItem,
    InfiniteLoading
  },
  data () {
    return {
      activeTab: 0,
      tabs: [
        { value: 'quiz', title: 'Quizzes' },
        { value: 'assignment', title: 'Assignments' },
      ],
      pointList: [],
      studentData: {},
      paging: {
        page: 1,
        size: 10,
        totalRecords: 20
      },
      isLoading: false,
      infiniteId: +new Date(),
      state: ''
    }
  },
  computed: {
    ...mapGetters([
      'points',
      'currentUser'
    ]),
    activeTabType () {
      return this.activeTab === 0 ? 'quiz' : 'assignment'
    }
  },
  methods: {
    ...mapActions([
      'fetchPointList'
    ]),
    resetPage () {
      this.isLoading = false
      this.pointList = []
      this.state = ''
      this.paging = {
        page: 1,
        size: 10,
        totalRecords: 20
      }
      this.infiniteId+=1
    },
    initPage ($state) {
      this.state = $state
      this.isLoading = true
      this.fetchPointList({
        data: {
          studentId: this.currentUser.id,
          type: this.activeTabType,
          page: this.paging.page,
          size: this.paging.size
        },
        callback: this.successFetchingPointList,
        fail: this.failFetchingPointList
      })
    },
    successFetchingPointList (response) {
      this.isLoading = false
      this.paging = response.paging
      if (response.scores.length) {
        this.pointList.push(...response.scores)
        this.studentData = {
          avatar: response.avatar,
          batchCode: response.batchCode,
          name: response.studentName,
          point: response.totalPoint,
          university: response.university
        }
        this.paging.page++
        this.state.loaded()
      }
      else {
        this.state.complete()
      }
    },
    failFetchingPointList () {
      this.$toasted.error('Something went wrong')
    }
  },
  watch: {
    activeTab () {
      this.resetPage()
    }
  }
}
