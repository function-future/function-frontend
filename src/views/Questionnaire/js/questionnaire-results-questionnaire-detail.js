import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import QuestionCard from '@/views/Questionnaire/QuestionCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireResultsQuestionnaireDetail',
  components: {
    QuestionnaireCard,
    QuestionCard
  },
  methods: {
    ...mapActions([
      'fetchCurrentQuestionnaireDetail',
      'fetchCurrentQuestionResponses'
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
    goToQuestionDetail (questionId) {
      this.$router.push({
        name: 'questionnaireResultsQuestionDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          memberId: this.$route.params.memberId,
          questionnaireId: this.$route.params.questionnaireId,
          questionId: questionId
        }
      })
    },
    errorHandler (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters([
      'currentResultQuestionnaireDetail',
      'currentResultQuestionResponsesList'
    ])
  },
  created () {
    this.fetchCurrentQuestionnaireDetail({
      data: {
        params: {
          questionnaireResponseSummaryId: this.$route.params.questionnaireId
        }
      },
      fail: this.errorHandler
    })
    this.fetchCurrentQuestionResponses({
      data: {
        params: {
          questionnaireResponseSummaryId: this.$route.params.questionnaireId,
          userSummaryId: this.$route.params.userSummaryId
        }
      },
      fail: this.errorHandler
    })
  }
}
