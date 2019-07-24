import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import BaseCard from '@/components/BaseCard'
import QuestionnaireCard from '../QuestionnaireCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import MyQuestionnaireForm from '../MyQuestionnaireForm'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'MyQuestionnaireAppraisee',
  components: {
    SearchBar,
    QuestionnaireCard,
    QuestionnaireParticipantCard,
    MyQuestionnaireForm,
    BaseButton,
    BaseCard
  },
  props: {
    currentAppraiseeName: {
      default: 'Unknown',
      type: String
    }
  },
  data () {
    return {
      questionnaireForm: {
        type: Array,
        default: []
      },
      responses: []
    }
  },
  methods: {
    ...mapActions([
      'fetchMyListApprisees',
      'fetchCurrentQuestionnaire',
      'fetchCurrentQuestionnaireData',
      'fetchCurrentQuestions',
      'saveAppraisee',
      'fetchCurrentQuestionsQuestionnaire',
      'resetQuestionnaireList'
    ]),
    ...mapMutations([
      'RESET_MY_LIST_APPRAISEE',
      'PUSH_MY_LIST_APPRAISEE',
      'RESET_CURRENT_QUESTIONNAIRE',
      'ASSIGN_CURRENT_QUESTIONNAIRE',
      'RESET_CURRENT_QUESTIONNAIRE_DATA',
      'ASSIGN_CURRENT_QUESTIONNAIRE_DATA',
      'ASSIGN_CURRENT_APPRAISEE_TO_SCORE',
      'RESET_QUESTIONS_QUESTIONNAIRE',
      'PUSH_QUESTIONS_QUESTIONNAIRE'
    ]),
    computedDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    goToInputQuestionnaireAnswer (appraisee) {
      this.fetchingQuestionnaireData(appraisee.id)
      this.$router.push({
        name: 'myQuestionnaireForm',
        params: { appraiseeId: appraisee.id }
      })
      this.fetchingQuestions()
    },
    fetchingQuestions () {
      this.fetchCurrentQuestionsQuestionnaire({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            appraiseeId: this.$route.params.appraiseeId
          }
        },
        fail: (err) => {
          console.log(err)
        },
        cb: (response) => {
          this.currentQuestionnaireForm = response.data
          for (let i = 0; i < response.data.length; i++) {
            this.currentQuestionnaireForm[i].score = 0
            this.currentQuestionnaireForm[i].comment = ''
          }
        }
      })
    },
    fetchingQuestionnaireData (appraiseeId) {
      this.fetchCurrentQuestionnaireData({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            appraiseeId: appraiseeId
          }
        },
        fail: (err) => {
          console.log(err)
        },
        cb: (response) => {
          console.log(response)
        }
      })
    },
    printScore () {
      let submitScore = true
      this.currentQuestionnaireForm.forEach(questionnaireScore => {
        if (questionnaireScore.score === 0) {
          submitScore = false
        }
        this.responses.push({
          idQuestion: questionnaireScore.id,
          score: questionnaireScore.score,
          comment: questionnaireScore.comment
        })
      })
      if (!submitScore) {
        this.$toasted.error('there are still unaswered question')
      } else {
        myQuestionnaireApi.addQuestionnaireResponse(response => {
          this.$toasted.success('success submit questionnaire response')
          this.backToAppraiseePage()
          this.resetQuestionnaireList()
        }, this.errorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            appraiseeId: this.$route.params.appraiseeId
          },
          body: {
            responses: this.responses
          }
        })
      }
    },
    errorCallback (err) {
      console.log(err)
      this.$toasted.error('connection error')
    },
    backToAppraiseePage () {
      this.$router.push({
        name: 'myQuestionnaireAppraisee',
        params: { questionnaireId: this.$route.params.questionnaireId }
      })
    },
    updateCurrentQuestionanireForm (questionNewValue) {
      this.currentQuestionnaireForm.forEach(question => {
        if (question.id === questionNewValue.id) {
          question.score = questionNewValue.score
          question.comment = questionNewValue.comment
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'myListAppraisees',
      'currentQuestionnaire',
      'currentQuestionnaireData',
      'currentAppraiseeToScore',
      'currentQuestionsQuestionnaire'
    ])
  },
  created () {
    this.fetchCurrentQuestionnaire({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchMyListApprisees({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchingQuestions()
    if (this.$route.params.appraiseeId) {
      this.fetchingQuestionnaireData(this.$route.params.appraiseeId)
    }
  },
  destroyed () {
    this.questionnaireForm = this.questionnaireForm.default
    this.responses = []

  }

}
