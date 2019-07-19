import QuestionnaireForm from '../QuestionnaireForm'
import QuestionCard from '../QuestionCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'


export default {
  name: 'QuestionnaireEdit',
  components: {
    QuestionnaireForm,
    QuestionCard,
    QuestionnaireParticipantCard,
    BaseButton,
    ModalAddQuestion,
    ModalDeleteConfirmation,
    ModalChatroom,
    ReminderMemberModal
  },
  data () {
    return {
      currentQuestionnaire: {},
      questionModal: false,
      participantModal: false,
      question: {
        id: '',
        description: '',
        isUpdate: false
      },
      deleteConfirmationModalQuestion: {
        show: false,
        id: '',
        selectedIndex: '',
        description: ''
      },
    }
  },
  computed: {
    ...mapGetters([
      'currentQuestionnaireAdmin',
      'currentQuestions',
      'currentAppraisee',
      'currentAppraiser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchCurrentQuestionnaireAdmin',
      'setCurrentQuestionnaireAdmin',
      'fetchCurrentQuestions',
      'fetchCurrentAppraisee'
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
            startDate: isNaN(Date.parse(this.currentQuestionnaireAdmin.startDate)) ? this.currentQuestionnaireAdmin.startDate : this.currentQuestionnaireAdmin.startDate.getTime(),
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
    resetDeleteConfirmationModalQuestion () {
      this.deleteConfirmationModalQuestion.show = false
      this.deleteConfirmationModalQuestion.id = ''
      this.deleteConfirmationModalQuestion.selectedIndex = ''
      this.deleteConfirmationModalQuestion.description = ''
    },
    openDeleteConfirmationModalQuestion (index, question) {
      this.deleteConfirmationModalQuestion.show = true
      this.deleteConfirmationModalQuestion.id = question.id
      this.deleteConfirmationModalQuestion.selectedIndex = index + 1
      this.deleteConfirmationModalQuestion.description = question.description
    },
    closeDeleteConfirmationModalQuestion () {
      this.deleteConfirmationModalQuestion.show = false
      this.resetDeleteConfirmationModalQuestion()
    },
    submitAddQuestion (value) {
      questionnaireApi.addQuestionQuestionnaire(response => {
        this.$toasted.success('success create question')
        this.fetchingQuestions()
      }, this.submitQuestionErrorCallback,
      {
        body: value,
        params: {
          questionnaireId: this.$route.params.questionnaireId,
        }
      })
    },
    submitQuestionErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to createQuestion')
    },
    fetchingQuestions () {
      this.fetchCurrentQuestions({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    deleteTheQuestionQuestionnaire () {
      questionnaireApi.deleteQuestionQuestionnaire(response => {
        this.$toasted.success('success delete question')
        this.fetchingQuestions()
        this.closeDeleteConfirmationModalQuestion()
      }, this.deleteErrorCallback,
      {
        params: {
          questionnaireId: this.$route.params.questionnaireId,
          questionId: this.deleteConfirmationModalQuestion.id
        }
      })
    },
    deleteErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to delete')
    },
    updateErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to update')
    },
    openEditModal (newQuestion) {
      this.questionModal = true
      this.question.id = newQuestion.id
      this.question.isUpdate = true
      this.question.description = newQuestion.description
    },
    closeQuestionModal () {
      this.questionModal = false
      this.question.id = ''
      this.question.isUpdate = false
      this.question.description = ''
    },
    updateTheQuestionQuestionnaire (value) {
      this.question.description = value.description
      questionnaireApi.updateQuestionQuestionnaire(response => {
        this.closeQuestionModal()
        this.$toasted.success('success Update Question')
        this.fetchingQuestions()
      }, this.updateErrorCallback,
      {
        params: {
          questionnaireId: this.$route.params.questionnaireId,
          questionId: this.question.id
        },
        body: {
          description: this.question.description
        }
      }
      )
    },
    submitParticipant (member) {
      alert('open modal')
      console.log(member)
    },
    fetchingAppraisee () {
      this.fetchCurrentAppraisee({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            page: 1,
            size: 10
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
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
    this.fetchingQuestions()
    this.fetchingAppraisee()
  }
}
