import QuestionnaireCard from '../QuestionnaireCard'
import QuestionCard from '../QuestionCard'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'QuestionnaireResultsQuestionnaireDetail',
  components: {
    QuestionnaireCard,
    QuestionCard
  },
  data () {
    return {
    }
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
