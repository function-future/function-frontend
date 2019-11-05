import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'comparison-detail',
  components: {
    InfiniteLoading,
    ListItem
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
      finalScore: ''
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
      'submitScore'
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
      this.$toasted.error('Something went wrong')
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
      this.$toasted.success('Score has been given to ' + this.studentData.name)
    },
    failedSubmittingScore () {
      this.$toasted.error('Something went wrong')
    }
  },
  watch: {
    activeTab () {
      this.resetPage()
      this.getPointsData()
    }
  }
}
