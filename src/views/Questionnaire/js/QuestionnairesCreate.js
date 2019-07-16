import BaseButton from '@/components/BaseButton'
import QuestionnaireForm from '../QuestionnaireForm'
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
        title: 'Test',
        description: 'Testing12345',
        startDate: new Date(1563357900000),
        dueDate: new Date(1563444300000)
      }
    }
  },
  methods: {
    goToCreate () {
      console.log(this.questionnaire.startDate.getTime())
      console.log(this.questionnaire.dueDate.getTime())
      if (this.questionnaire.startDate >= this.questionnaire.dueDate) {
        this.$toasted.error('due date should greater than start date ')
      } else if (this.questionnaire.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.$toasted.error('start date should greater than yesterday  ')
      } else {
        questionnaireApi.createQuestionnaire(response => {
          this.resetProps()
          console.log(response.data)
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
      this.questionnaire.startDate = new Date()
      this.questionnaire.dueDate = new Date()
    },
    submitMessageErrorCallback (err) {
      this.resetProps()
      console.log(err)
      this.$toasted.error('Fail to createQuestionnaire')
    }
  },
  watch: {
    questionnaire: function (val) {
      this.questionnaire = val
    }
  }
}
