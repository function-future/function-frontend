import { mapActions, mapGetters } from 'vuex'
const EmptyState = () => import('@/components/emptyState/EmptyState')
const ListItem = () => import('@/components/list/ListItem')
const UserListItem = () => import('@/components/list/UserListItem')
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Point',
  components: {
    EmptyState,
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
      failLoadingPoints: false,
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
    },
    pointListEmpty () {
      return !(this.pointList && this.pointList.length)
    }
  },
  methods: {
    ...mapActions([
      'fetchPointList',
      'toast'
    ]),
    resetPage () {
      this.isLoading = false
      this.failLoadingPoints = false
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
      this.isLoading = false
      this.failLoadingPoints = true
    }
  },
  watch: {
    activeTab () {
      this.resetPage()
    }
  }
}
