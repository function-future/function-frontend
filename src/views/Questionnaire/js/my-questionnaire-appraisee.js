import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import BaseCard from '@/components/BaseCard'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import MyQuestionnaireForm from '@/views/Questionnaire/MyQuestionnaireForm'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import { mapGetters, mapActions } from 'vuex'
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
      currentQuestionnaireForm: [],
      responses: [],
      appraiseeDone: [],
      currentNameTemp: ''
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
      'resetQuestionnaireList',
      'toast'
    ]),
    computedDate (date) {
      return moment(date).format('DD MMM YYYY, h:mm a')
    },
    goToInputQuestionnaireAnswer (appraisee) {
      this.currentNameTemp = appraisee.name
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
        fail: this.errorCallback,
        cb: this.fetchingQuestionsCallback
      })
    },
    fetchingQuestionsCallback (response) {
      this.currentQuestionnaireForm = response.data
      for (let i = 0; i < response.data.length; i++) {
        this.currentQuestionnaireForm[i].score = 0
        this.currentQuestionnaireForm[i].comment = ''
      }
    },
    fetchingQuestionnaireData (appraiseeId) {
      this.fetchCurrentQuestionnaireData({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            appraiseeId: appraiseeId
          }
        },
        fail: this.errorCallback
      })
    },
    printScore () {
      let submitScore = true
      this.responses = []
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
        this.toast({
          data: {
            message: 'there are still unanswered question',
            type: 'is-danger'
          }
        })
      } else {
        myQuestionnaireApi.addQuestionnaireResponse(response => {
          this.toast({
            data: {
              message: 'success submit questionnaire response',
              type: 'is-success'
            }
          })
          this.backToAppraiseePage()
          this.resetQuestionnaireList()
          this.fetchMyListApprisees({
            data: {
              params: {
                questionnaireId: this.$route.params.questionnaireId
              }
            },
            fail: this.errorCallbackCurrentQuestionnaire
          })
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
    errorCallbackCurrentQuestionnaire (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'connection error',
          type: 'is-danger'
        }
      })
    },
    errorCallbackAppraisee (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'connection error',
          type: 'is-danger'
        }
      })
    },
    errorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'connection error',
          type: 'is-danger'
        }
      })
    },
    backToAppraiseePage () {
      this.$router.replace({
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
      'currentQuestionsQuestionnaire'
    ])
  },
  created () {
    this.responses =[]
    this.currentQuestionnaireForm = []

    this.fetchCurrentQuestionnaire({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: this.errorCallbackCurrentQuestionnaire
    })
    this.fetchMyListApprisees({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: this.errorCallbackCurrentQuestionnaire
    })
    this.fetchingQuestions()
    if (this.$route.params.appraiseeId) {
      this.fetchingQuestionnaireData(this.$route.params.appraiseeId)
    }

    myQuestionnaireApi.getListAppraiseeDone(response => {
      this.appraiseeDone = response.data
    }, this.errorCallBack,
    {
      params: {
        questionnaireId: this.$route.params.questionnaireId
      }
    })
  },
  destroyed () {
    this.questionnaireForm = this.questionnaireForm.default
    this.responses = []
    this.currentQuestionnaireForm = []
  }
}
