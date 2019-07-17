import QuestionnaireForm from '../QuestionnaireForm'
import QuestionCard from '../QuestionCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'

export default {
  name: 'QuestionnaireEdit',
  components: {
    QuestionnaireForm,
    QuestionCard,
    QuestionnaireParticipantCard,
    BaseButton
  },
  data () {
    return {
      appraisee: {
        id: 'sample-id',
        name: 'ricky',
        avatar: 'aa',
        role: 'STUDENT',
        university: 'ITB',
        batch: 'future3.0'
      },
      questions: [
        {
          id: 'question-id',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id2',
          description: 'Lorem-ipsum1',
          score: 6.0
        },
        {
          id: 'question-id3',
          description: 'Lorem-ipsum2',
          score: 6.0
        }
      ],
      i: 1,
      currentQuestionnaire: {}
    }
  },
  computed: {
    ...mapGetters([
      'currentQuestionnaireAdmin'
    ])
  },
  methods: {
    ...mapActions([
      'fetchCurrentQuestionnaireAdmin',
      'setCurrentQuestionnaireAdmin'
    ]),
    ...mapMutations([
      'RESET_CURRENT_QUESTIONNAIRE_ADMIN',
      'ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN',
      'RESET_CURRENT_QUESTIONS',
      'PUSH_CURRENT_QUESTIONS',
      'RESET_CURRENT_APPRAISEE',
      'PUSH_CURRENT_APPRAISEE',
      'RESET_CURRENT_APPRAISER',
      'PUSH_CURRENT_APPRAISER'
    ]),
    setCurrentQuestionnaire (data) {
      this.setCurrentQuestionnaireAdmin({
        data: data
      })
    },
    goToUpdateDescription () {
      console.log('send update')
      if (this.currentQuestionnaireAdmin.title === ' ' || this.currentQuestionnaireAdmin.description === ' ') {
        this.$toasted.error(' title and description must be filled')
      } else if (this.currentQuestionnaireAdmin.startDate >= this.currentQuestionnaireAdmin.dueDate) {
        this.$toasted.error('due date should greater than start date ')
      } else if (this.currentQuestionnaireAdmin.startDate === this.currentQuestionnaireAdmin.dueDate) {
        this.$toasted.error('due date should not same with start date ')
      } else if (this.currentQuestionnaireAdmin.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.$toasted.error('start date should greater than yesterday  ')
      } else {
        questionnaireApi.updateQuestionnaire(response => {
          this.setCurrentQuestionnaire(response.data)
          this.$toasted.success('succeess update')
        }, this.submitMessageErrorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId
          },
          body: {
            title: this.currentQuestionnaireAdmin.title,
            desc: this.currentQuestionnaireAdmin.description,
            startDate: isNaN(Date.parse(this.currentQuestionnaireAdmin.startDate)) ? this.currentQuestionnaireAdmin.startDate : this.currentQuestionnaireAdmin.startDate.getTime() ,
            dueDate: isNaN(Date.parse(this.currentQuestionnaireAdmin.dueDate)) ? this.currentQuestionnaireAdmin.dueDate : this.currentQuestionnaireAdmin.dueDate.getTime()
          }
        })
      }
    },
    submitMessageErrorCallback (err) {
      this.resetProps()
      console.log(err)
      this.$toasted.error('Fail to createQuestionnaire')
    },
    AlertEdit (question) {
      alert('this one edit')
      console.log(question)
    },
    AlertDelete () {
      alert('this one delete')
    }
  },
  created () {
    this.fetchCurrentQuestionnaireAdmin({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
