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
    ...mapMutations([
      'RESET_CURRENT_QUESTIONNAIRE_DETAIL',
      'ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL',
      'RESET_CURRENT_QUESTION_RESPONSES_LIST',
      'PUSH_CURRENT_QUESTION_RESPONSES_LIST'
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
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchCurrentQuestionResponses({
      data: {
        params: {
          questionnaireResponseSummaryId: this.$route.params.questionnaireId,
          userSummaryId: this.$route.params.userSummaryId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
