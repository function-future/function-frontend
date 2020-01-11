import QuestionnaireForm from '@/views/Questionnaire/QuestionnaireForm'
import QuestionCard from '@/views/Questionnaire/QuestionCard'
import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalChatroom from '@/views/Chatrooms/deprecated/ModalChatroom'
import { mapActions, mapGetters } from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'
import UserSimpleCard from '@/components/UserSimpleCard'

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
    ReminderMemberModal,
    UserSimpleCard
  },
  data () {
    return {
      questionModal: false,
      participantModal: false,
      participantModalAppraiser: false,
      currentAppraiseeTemp: {
        type: Array,
        default: null
      },
      currentAppraiserTemp: {
        type: Array,
        default: null
      },
      question: {
        id: '',
        description: '',
        isUpdate: false,
        type: 'Question'
      },
      deleteConfirmationModalQuestion: {
        show: false,
        id: '',
        selectedIndex: '',
        description: ''
      },
      deleteConfirmationModalParticipant: {
        show: false,
        participantId: '',
        name: '',
        isAppraisee: false
      }
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
  watch: {
    currentAppraiseeTemp () {
      this.computedAppraisee()
    },
    currentAppraiserTemp () {
      this.computedAppraiser()
    }
  },
  methods: {
    computedAppraisee () {
      return this.currentAppraiseeTemp ? this.currentAppraisee : []
    },
    computedAppraiser () {
      return this.currentAppraiserTemp ? this.currentAppraiser : []
    },
    ...mapActions([
      'fetchCurrentQuestionnaireAdmin',
      'setCurrentQuestionnaireAdmin',
      'fetchCurrentQuestions',
      'fetchCurrentAppraisee',
      'fetchCurrentAppraiser'
    ]),
    setCurrentQuestionnaire (data) {
      this.setCurrentQuestionnaireAdmin({
        data: data
      })
    },
    goToUpdateDescription () {
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
      console.log(err)
      this.$toasted.error('Fail to updateQuestionnaire')
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
    submitAddQuestion (value) {
      questionnaireApi.addQuestionQuestionnaire(response => {
        this.$toasted.success('success create question')
        this.fetchingQuestions()
      }, this.submitQuestionErrorCallback,
      {
        body: value,
        params: {
          questionnaireId: this.$route.params.questionnaireId
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
        fail: this.errorHandler
      })
    },
    deleteTheQuestionQuestionnaire () {
      questionnaireApi.deleteQuestionQuestionnaire(response => {
        this.$toasted.success('success delete question')
        this.fetchingQuestions()
        this.resetDeleteConfirmationModalQuestion()
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
    addErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to add')
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
      questionnaireApi.addAppraiseeQuestionnaire(response => {
        this.participantModal = false
        this.$toasted.success('success Add Appraisee')
        this.fetchingAppraisee()
      }, this.addErrorCallback,
      {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        },
        body: {
          idParticipant: member.id
        }
      })
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
        fail: this.errorHandler,
        cb: this.fetchingAppraiseeCallback
      })
    },
    fetchingAppraiseeCallback (response) {
      this.currentAppraiseeTemp = response.data
    },
    openDeleteConfirmationModalParticipantAppraisee (appraisee) {
      this.deleteConfirmationModalParticipant.show = true
      this.deleteConfirmationModalParticipant.participantId = appraisee.participantId
      this.deleteConfirmationModalParticipant.name = appraisee.name
      this.deleteConfirmationModalParticipant.isAppraisee = true
    },
    openDeleteConfirmationModalParticipantAppraiser (appraisee) {
      this.deleteConfirmationModalParticipant.show = true
      this.deleteConfirmationModalParticipant.participantId = appraisee.participantId
      this.deleteConfirmationModalParticipant.name = appraisee.name
      this.deleteConfirmationModalParticipant.isAppraisee = false
    },
    closeDeleteConfirmationModalParticipant () {
      this.deleteConfirmationModalParticipant.show = false
      this.deleteConfirmationModalParticipant.participantId = ''
      this.deleteConfirmationModalParticipant.name = ''
      this.deleteConfirmationModalParticipant.isAppraisee = false
    },
    deleteTheParticipant () {
      if (this.deleteConfirmationModalParticipant.isAppraisee) {
        questionnaireApi.deleteAppraiseeQuestionnaire(response => {
          this.$toasted.success('success delete Appraisee')
          this.fetchingAppraisee()
          this.closeDeleteConfirmationModalParticipant()
        }, this.deleteErrorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            questionnaireParticipantId: this.deleteConfirmationModalParticipant.participantId
          }
        })
      } else {
        questionnaireApi.deleteAppraiserQuestionnaire(response => {
          this.$toasted.success('success delete Appraiser')
          this.fetchingAppraiser()
          this.closeDeleteConfirmationModalParticipant()
        }, this.deleteErrorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            questionnaireParticipantId: this.deleteConfirmationModalParticipant.participantId
          }
        })
      }
    },
    fetchingAppraiser () {
      this.fetchCurrentAppraiser({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            page: 1,
            size: 10
          }
        },
        fail: this.errorHandler,
        cb: this.fetchingAppraiserCallback
      })
    },
    fetchingAppraiserCallback (response) {
      this.currentAppraiserTemp = response.data
    },
    submitParticipantAppraiser (member) {
      questionnaireApi.addAppraiserQuestionnaire(response => {
        this.participantModalAppraiser = false
        this.$toasted.success('success Add Appraiser')
        this.fetchingAppraiser()
      }, this.addErrorCallback,
      {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        },
        body: {
          idParticipant: member.id
        }
      })
    },
    errorHandler (err) {
      console.log(err)
    }
  },
  created () {
    this.fetchCurrentQuestionnaireAdmin({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: this.errorHandler
    })
    this.fetchingQuestions()
    this.fetchingAppraisee()
    this.fetchingAppraiser()
  }
}
