import SearchBar from '@/components/SearchBar'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
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
  computed: {
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
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size,
          batchCode: this.$route.params.batchCode,
        }
      })
    }
  }
}
