import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
const ListItem = () => import('@/components/list/ListItem')
const ModalInputFinalScore = () => import('@/components/modals/ModalInputFinalScore')

export default {
  name: 'comparison-detail',
  components: {
    InfiniteLoading,
    ListItem,
    ModalInputFinalScore
  },
  props: [
    'studentData'
  ],
  data() {
    return {
      tabs: [
        {
          label: 'Quiz',
          value: 'quiz'
        },
        {
          label: 'Assignment',
          value: 'assignment'
        }
      ],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 10
      },
      activeTab: 0,
      infiniteId: +new Date(),
      state: '',
      pointData: {},
      finalScore: '',
      isMobileScoreModalVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    studentId () {
      return this.studentData.id
    },
    scoreList () {
      return this.pointData.scores
    }
  },
  methods: {
    ...mapActions([
      'fetchPointList',
      'submitScore',
      'toast'
    ]),
    resetPage() {
      this.paging = {
        page: 1,
        size: 10,
        totalRecords: 10
      }
      this.pointData = []
      this.state = ''
      this.infiniteId += 1
    },
    getPointsData ($state) {
      this.state = $state
      this.fetchPointList({
        data: {
          studentId: this.studentId,
          type: this.tabs[this.activeTab].value,
          page: this.paging.page,
          size: this.paging.size
        },
        callback: this.successFetchingPointList,
        fail: this.failFetchingPointList
      })
    },
    successFetchingPointList (response) {
      if (!this.finalScore) {
        this.finalScore = response.point
      }
      this.paging = response.paging
      if (response.scores.length) {
        this.pointData = response
        this.paging.page++
        this.state.loaded()
      }
      else {
        this.state.complete()
      }
    },
    failFetchingPointList () {
      this.toast({
        data: {
          message: 'Fail fetching student\'s points',
          type: 'is-danger'
        }
      })
      this.state.complete()
    },
    submitFinalScore () {
      this.submitScore({
        payload: {
          score: this.finalScore,
          studentId: this.studentData.id
        },
        callback: this.successSubmittingScore,
        fail: this.failedSubmittingScore
      })
    },
    successSubmittingScore () {
      this.toast({
        data: {
          message: 'Score has been successfully given to ' + this.studentData.name,
          type: 'is-success'
        }
      })
    },
    failedSubmittingScore () {
      this.toast({
        data: {
          message: 'Fail to give score to ' + this.studentData.name,
          type: 'is-danger'
        }
      })
      this.finalScore = this.pointData.point
    },
    closeScoreModal () {
      this.isMobileScoreModalVisible = false
    },
    getFinalScoreFromModal (score) {
      this.finalScore = score
      this.submitFinalScore()
    }
  },
  watch: {
    activeTab () {
      this.resetPage()
      this.getPointsData()
    }
  }
}
