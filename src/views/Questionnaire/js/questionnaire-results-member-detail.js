import QuestionnaireParticipantDetailCard from '@/views/Questionnaire/QuestionnaireParticipantDetailCard'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireResultsMemberDetail',
  components: {
    QuestionnaireParticipantDetailCard,
    QuestionnaireCard
  },
  methods: {
    ...mapActions([
      'fetchCurrentAppraiseeResults',
      'fetchCurrentAppraiseeResultsQuestionnaires'
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
    errorHandler (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters([
      'currentAppraiseeResult',
      'currentAppraiseeResultQuetionnaires'
    ])
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
    this.fetchCurrentAppraiseeResultsQuestionnaires({
      data: {
        params: {
          userSummaryId: this.$route.params.userSummaryId,
          page: 1,
          size: 10
        }
      },
      fail: this.errorHandler
    })
  }
}
