import QuestionnaireParticipantDetailCard from '@/views/Questionnaire/QuestionnaireParticipantDetailCard'
import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import questionnaireResultsApi from '@/api/controller/questionnaire-results'

export default {
  name: 'QuestionnaireResultsMemberDetail',
  components: {
    QuestionnaireParticipantDetailCard,
    QuestionnaireParticipantCard,
    QuestionnaireCard,
    InfiniteLoading
  },
  data () {
    return {
      appraiseeTemp: {},
      appraiseeResultsQuestionnaires: [],
      page: 1,
      size: 10
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentAppraiseeResults'
    ]),
    goToQuestionnaireResult (questionnaireId) {
      this.$router.push({
        name: 'questionnaireResultsQuestionnaireDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: this.$route.params.userSummaryId,
          questionnaireId: questionnaireId
        }
      })
    },
    infiniteHandler ($state) {
      questionnaireResultsApi.getQuestionnaireSimpleSummary(response => {
        if (this.page === 1) {
          this.appraiseeResultsQuestionnaires = []
        }
        if (response.data.length) {
          this.page += 1
          this.appraiseeResultsQuestionnaires.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size,
          userSummaryId: this.$route.params.userSummaryId
        }
      })
    },
    errorCallback (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters([
      'currentAppraiseeResult'
    ])
  },
  watch: {
    currentAppraiseeResult () {
      this.appraiseeTemp = this.currentAppraiseeResult.member
    }
  },
  created () {
    this.fetchCurrentAppraiseeResults({
      data: {
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: this.$route.params.userSummaryId
        }
      },
      fail: this.errorHandler
    })
    //
    // questionnaireResultsApi.getQuestionnaireSimpleSummary(response => {
    //   this.appraiseeResultsQuestionnaires.push(...response.data)
    //   console.log(response)
    // }, this.errorCallback, {
    //   params: {
    //     page: this.page,
    //     size: this.size,
    //     userSummaryId: this.$route.params.userSummaryId
    //   }
    // })
  }
}
