import SearchBar from '@/components/SearchBar'
import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import InfiniteLoading from 'vue-infinite-loading'
import questionnaireResultsApi from '@/api/controller/questionnaire-results'

export default {
  name: 'QuestionnaireResultsMembers',
  components: {
    SearchBar,
    QuestionnaireParticipantCard,
    InfiniteLoading
  },
  data () {
    return {
      appraiseeResults: [],
      page: 1,
      size: 10
    }
  },
  methods: {
    goToMemberDetail (userSummaryId) {
      this.$router.push({
        name: 'questionnaireResultsMemberDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: userSummaryId
        }
      })
    },
    infiniteHandler ($state) {
      questionnaireResultsApi.getUserSummary(response => {
        if (this.page === 1) {
          this.appraiseeResults = []
        }
        if (response.data.length) {
          this.page += 1
          this.appraiseeResults.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorHandler, {
        params: {
          page: this.page,
          size: this.size,
          batchCode: this.$route.params.batchCode,
        }
      })
    },
    errorHandler (err) {
      console.log(err)
    }
  },
  created () {
    questionnaireResultsApi.getUserSummary(response => {
      this.appraiseeResults.push(...response.data)
    }, this.errorHandler, {
      params: {
        page: this.page,
        size: this.size,
        batchCode: this.$route.params.batchCode
     }
    })
  }
}
