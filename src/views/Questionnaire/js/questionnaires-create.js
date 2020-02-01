import BaseButton from '@/components/BaseButton'
import QuestionnaireForm from '@/views/Questionnaire/QuestionnaireForm'
import QuestionnaireEdit from '@/views/Questionnaire/QuestionnaireEdit'
import questionnaireApi from '@/api/controller/questionnaire'
import { mapActions } from 'vuex'

export default {
  name: 'QuestionnairesCreate',
  components: {
    BaseButton,
    QuestionnaireForm,
    QuestionnaireEdit
  },
  data () {
    return {
      questionnaire: {
        title: '',
        description: '',
        startDate: new Date(),
        dueDate: new Date()
      }
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    goToCreate () {
      if (this.questionnaire.title === '' || this.questionnaire.description === '') {
        this.toast({
          data: {
            message: 'title and description must be filled',
            type: 'is-danger'
          }
        })
      } else if (this.questionnaire.startDate > this.questionnaire.dueDate) {
        this.toast({
          data: {
            message: 'due date should greater than start date',
            type: 'is-danger'
          }
        })
      } else if (this.questionnaire.startDate === this.questionnaire.dueDate) {
        this.toast({
          data: {
            message: 'due date should greater than start date',
            type: 'is-danger'
          }
        })
      } else if (this.questionnaire.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.toast({
          data: {
            message: 'due date should greater than start date',
            type: 'is-danger'
          }
        })
      } else {
        questionnaireApi.createQuestionnaire(response => {
          console.log(response)
          this.$router.push({
            name: 'questionnairesEdit',
            params: {
              questionnaireId: response.data.id
            }
          })
        }, this.submitMessageErrorCallback,
        {
          body: {
            title: this.questionnaire.title,
            desc: this.questionnaire.description,
            startDate: this.questionnaire.startDate.getTime(),
            dueDate: this.questionnaire.dueDate.getTime()
          }
        })
      }
    },
    resetProps () {
      this.questionnaire.title = ''
      this.questionnaire.description = ''
      this.questionnaire.startDate = null
      this.questionnaire.dueDate = null
    },
    submitMessageErrorCallback (err) {
      this.resetProps()
      console.log(err)
      this.toast({
        data: {
          message: 'Fail to create questionnaire',
          type: 'is-danger'
        }
      })
    },
    setCurrentQuestionnaire (data) {
      this.questionnaire = data
    }
  }
}
