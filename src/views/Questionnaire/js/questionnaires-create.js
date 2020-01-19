import BaseButton from '@/components/BaseButton'
import QuestionnaireForm from '@/views/Questionnaire/QuestionnaireForm'
import questionnaireApi from '@/api/controller/questionnaire'

export default {
  name: 'QuestionnairesCreate',
  components: {
    BaseButton,
    QuestionnaireForm
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
    goToCreate () {
      if (this.questionnaire.title === '' || this.questionnaire.description === '') {
        this.$toasted.error(' title and description must be filled')
      } else if (this.questionnaire.startDate > this.questionnaire.dueDate) {
        this.$toasted.error('due date should greater than start date ')
      } else if (this.questionnaire.startDate === this.questionnaire.dueDate) {
        this.$toasted.error('due date should not same with start date ')
      } else if (this.questionnaire.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.$toasted.error('start date should greater than yesterday  ')
      } else {
        questionnaireApi.createQuestionnaire(response => {
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
      this.$toasted.error('Fail to createQuestionnaire')
    },
    setCurrentQuestionnaire (data) {
      this.questionnaire = data
    }
  }
}
