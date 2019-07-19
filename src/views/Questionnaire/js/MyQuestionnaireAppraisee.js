import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import BaseCard from '@/components/BaseCard'
import QuestionnaireCard from '../QuestionnaireCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import MyQuestionnaireForm from '../MyQuestionnaireForm'
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
      myQuestionnaire: {
        id: '5d2352f94534202434730f2a',
        title: 'future batch 3',
        description: 'future 3 bootcamp questionnaire',
        startDate: 1562596044000,
        dueDate: 1562682444000
      },
      questionnaireForm: {
        type: Array,
        default: []
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchMyListApprisees',
      'fetchCurrentQuestionnaire',
      'fetchCurrentQuestions',
      'saveAppraisee',
      'fetchCurrentQuestionsQuestionnaire'
    ]),
    ...mapMutations([
      'RESET_MY_LIST_APPRAISEE',
      'PUSH_MY_LIST_APPRAISEE',
      'RESET_CURRENT_QUESTIONNAIRE',
      'ASSIGN_CURRENT_QUESTIONNAIRE',
      'ASSIGN_CURRENT_APPRAISEE_TO_SCORE',
      'RESET_QUESTIONS_QUESTIONNAIRE',
      'PUSH_QUESTIONS_QUESTIONNAIRE'
    ]),
    computedDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    goToInputQuestionnaireAnswer (appraisee) {
      this.saveAppraisee({
        name: appraisee.name
      })
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
    printScore () {
      let submitScore = true
      console.log('lastScore')
      this.currentQuestionnaireForm.forEach(questionnaireScore => {
        if (questionnaireScore.score === 0) {
          submitScore = false
        }
      })
      if (!submitScore) {
        this.$toasted.error('there are still unaswered question')
      } else {

      }
    }
  },
  computed: {
    ...mapGetters([
      'myListAppraisees',
      'currentQuestionnaire',
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
  }

}
