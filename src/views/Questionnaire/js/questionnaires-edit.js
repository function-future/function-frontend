import QuestionnaireForm from '@/views/Questionnaire/QuestionnaireForm'
import QuestionCard from '@/views/Questionnaire/QuestionCard'
import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
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
      currentAppraiseeTemp: [],
      currentAppraiserTemp: [],
      currentQuestionsTemp: [],
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
        participant: {},
        isAppraisee: false
      },
      progressValue: 1,
      maxValue: 4,
      questions: [],
      removedAppraisee: [],
      removedAppraiser: []
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
    },
    currentQuestionsTemp () {
      this.computedQuestions()
    }
  },
  methods: {
    computedAppraisee () {
      return this.currentAppraiseeTemp ? this.currentAppraisee : []
    },
    computedAppraiser () {
      return this.currentAppraiserTemp ? this.currentAppraiser : []
    },
    computedQuestions () {
      return this.currentQuestionsTemp ? this.currentQuestions : []
    },
    ...mapActions([
      'fetchCurrentQuestionnaireAdmin',
      'setCurrentQuestionnaireAdmin',
      'fetchCurrentQuestions',
      'fetchCurrentAppraisee',
      'fetchCurrentAppraiser',
      'toast'
    ]),
    setCurrentQuestionnaire (data) {
      this.setCurrentQuestionnaireAdmin({
        data: data
      })
      this.currentQuestionnaireAdmin.startDate = new Date(this.currentQuestionnaireAdmin.startDate)
      this.currentQuestionnaireAdmin.dueDate = new Date(this.currentQuestionnaireAdmin.dueDate)
    },
    goToUpdateDescription () {
      if (this.currentQuestionnaireAdmin.title === ' ' || this.currentQuestionnaireAdmin.description === ' ') {
        this.toast({
          data: {
            message: 'title and description must be filled',
            type: 'is-danger'
          }
        })
      } else if (this.currentQuestionnaireAdmin.startDate >= this.currentQuestionnaireAdmin.dueDate) {
        this.toast({
          data: {
            message: 'due date should greater than start date',
            type: 'is-danger'
          }
        })
      } else if (this.currentQuestionnaireAdmin.startDate === this.currentQuestionnaireAdmin.dueDate) {
        this.toast({
          data: {
            message: 'due date should not same with start date',
            type: 'is-danger'
          }
        })
      } else if (this.currentQuestionnaireAdmin.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.toast({
          data: {
            message: 'start date should greater than yesterday',
            type: 'is-danger'
          }
        })
      } else {
        questionnaireApi.updateQuestionnaire(response => {
          this.setCurrentQuestionnaire(response.data)
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
      this.toast({
        data: {
          message: 'Fail to updateQuestionnaire',
          type: 'is-danger'
        }
      })
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
      value.id = null
      this.currentQuestionsTemp.push(value)
    },
    submitQuestionErrorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'Fail to createQuestion',
          type: 'is-danger'
        }
      })
    },
    fetchingQuestions () {
      this.fetchCurrentQuestions({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId
          }
        },
        fail: this.errorHandler,
        cb: this.fetchingQuestionsCallback
      })
    },
    fetchingQuestionsCallback (response) {
      this.currentQuestionsTemp = response.data
    },
    deleteTheQuestionQuestionnaire () {
      this.currentQuestionsTemp.splice(this.deleteConfirmationModalQuestion.selectedIndex, 1)
      this.resetDeleteConfirmationModalQuestion()
    },
    deleteErrorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'Fail to delete',
          type: 'is-danger'
        }
      })
    },
    updateErrorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'Fail to update',
          type: 'is-danger'
        }
      })
    },
    addErrorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'Fail to add',
          type: 'is-danger'
        }
      })
    },
    openEditModal (newQuestion, index) {
      this.questionModal = true
      this.question.id = newQuestion.id
      this.question.isUpdate = true
      this.question.description = newQuestion.description
      this.question.index = index
    },
    closeQuestionModal () {
      this.questionModal = false
      this.question.id = ''
      this.question.isUpdate = false
      this.question.description = ''
    },
    updateTheQuestionQuestionnaire (value) {
      this.currentQuestionsTemp[this.question.index].description = value.description
      this.closeQuestionModal()
    },
    addAppraisee (member) {
      console.log(member)
      this.currentAppraiseeTemp.push(member)
      for (var i = 0; i < this.removedAppraisee.length; i++) {
        if (this.removedAppraisee[i].id === member.id) {
          this.removedAppraisee.splice(i, 1)
        }
      }
    },
    addAppraiser (member) {
      console.log(member)
      this.currentAppraiserTemp.push(member)
      for (var i = 0; i < this.removedAppraiser.length; i++) {
        if (this.removedAppraiser[i].id === member.id) {
          this.removedAppraiser.splice(i, 1)
        }
      }
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
      this.deleteConfirmationModalParticipant.isAppraisee = true
      this.deleteConfirmationModalParticipant.participant = appraisee
    },
    openDeleteConfirmationModalParticipantAppraiser (appraiser) {
      this.deleteConfirmationModalParticipant.show = true
      this.deleteConfirmationModalParticipant.isAppraisee = false
      this.deleteConfirmationModalParticipant.participant = appraiser
    },
    closeDeleteConfirmationModalParticipant () {
      this.deleteConfirmationModalParticipant.show = false
      this.deleteConfirmationModalParticipant.isAppraisee = false
      this.deleteConfirmationModalParticipant.participant = {}
    },
    deleteTheParticipant () {
      if (this.deleteConfirmationModalParticipant.isAppraisee) {
        let deleteIdx = this.currentAppraiseeTemp.indexOf(this.deleteConfirmationModalParticipant.participant)
        if (deleteIdx !== -1) {
          this.currentAppraiseeTemp.splice(deleteIdx, 1)
        }
        if (!this.removedAppraisee.includes(this.deleteConfirmationModalParticipant.participant) &&
          this.currentAppraisee.includes(this.deleteConfirmationModalParticipant.participant)
        ) {
          this.removedAppraisee.push(this.deleteConfirmationModalParticipant.participant)
        }
      } else {
        let deleteIdx = this.currentAppraiserTemp.indexOf(this.deleteConfirmationModalParticipant.participant)
        if (deleteIdx !== -1) {
          this.currentAppraiserTemp.splice(deleteIdx, 1)
        }
        if (!this.removedAppraiser.includes(this.deleteConfirmationModalParticipant.participant) &&
          this.currentAppraiser.includes(this.deleteConfirmationModalParticipant.participant)
        ) {
          this.removedAppraiser.push(this.deleteConfirmationModalParticipant.participant)
        }
      }
      this.closeDeleteConfirmationModalParticipant()
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
    errorHandler (err) {
      console.log(err)
    },
    updateQuestions () {
      this.currentQuestionsTemp.forEach(question => {
        if (question.id == null) {
          questionnaireApi.addQuestionQuestionnaire(response => {
          }, this.submitQuestionErrorCallback,
          {
            body: {
              description: question.description
            },
            params: {
              questionnaireId: this.$route.params.questionnaireId
            }
          })
        } else {
          questionnaireApi.updateQuestionQuestionnaire(response => {

          },
          this.updateErrorCallback,
          {
            params: {
              questionnaireId: this.$route.params.questionnaireId,
              questionId: question.id
            },
            body: {
              description: question.description
            }
          })
        }
      })
    },
    updateAppraisee () {
      this.currentAppraiseeTemp.forEach(member => {
        if (!this.currentAppraisee.includes(member)) {
          questionnaireApi.addAppraiseeQuestionnaire(response => {
          }, this.addErrorCallback,
          {
            params: {
              questionnaireId: this.$route.params.questionnaireId
            },
            body: {
              idParticipant: member.id
            }
          })
        }
      })
      this.removedAppraisee.forEach(member => {
        questionnaireApi.deleteAppraiseeQuestionnaire(response => {
        }, this.deleteErrorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            questionnaireParticipantId: member.participantId
          }
        })
      })
    },
    updateAppraiser () {
      this.currentAppraiserTemp.forEach(member => {
        if (!this.currentAppraiser.includes(member)) {
          questionnaireApi.addAppraiserQuestionnaire(response => {
          }, this.addErrorCallback,
          {
            params: {
              questionnaireId: this.$route.params.questionnaireId
            },
            body: {
              idParticipant: member.id
            }
          })
        }
      })
      this.removedAppraiser.forEach(member => {
        questionnaireApi.deleteAppraiserQuestionnaire(response => {

        }, this.deleteErrorCallback,
        {
          params: {
            questionnaireId: this.$route.params.questionnaireId,
            questionnaireParticipantId: member.participantId
          }
        })
      })
    },
    nextProgress () {
      if (this.progressValue === 4) {
        this.updateQuestionnaire()
      } else {
        this.progressValue = this.progressValue + 1
      }
    },
    prevProgress () {
      this.progressValue = this.progressValue - 1
    },
    updateQuestionnaire () {
      this.goToUpdateDescription()
      this.updateQuestions()
      this.updateAppraisee()
      this.updateAppraiser()
      this.$router.replace({
        name: 'questionnaires'
      })
      this.toast({
        data: {
          message: 'success update questionnaire',
          type: 'is-success'
        }
      })
    },
    fetchingCurrentQuestionnarieAdmin () {
      this.fetchCurrentQuestionnaireAdmin({
        data: {
          params: {
            questionnaireId: this.$route.params.questionnaireId
          }

        },
        fail: this.errorHandler
      })
      this.currentQuestionnaireAdmin.startDate = new Date(this.currentQuestionnaireAdmin.startDate)
      this.currentQuestionnaireAdmin.dueDate = new Date(this.currentQuestionnaireAdmin.dueDate)
    }
  },
  created () {
    this.fetchingCurrentQuestionnarieAdmin()
    this.fetchingQuestions()
    this.fetchingAppraisee()
    this.fetchingAppraiser()
  }
}
