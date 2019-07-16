import BaseButton from '@/components/BaseButton'
import QuestionnaireForm from '../QuestionnaireForm'
import {now} from "moment";

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
        desc: '',
        startDate: new Date(),
        dueDate: new Date()
      }
    }
  },
  methods: {
    goToCreate () {
      if (this.questionnaire.startDate >= this.questionnaire.dueDate) {
        this.$toasted.error('due date should greater than start date ')
      } if (this.questionnaire.startDate < new Date().setHours(0, 0, 0, 0)) {
        this.$toasted.error('start date should greater than yesterday  ')
      } else {
        this.$router.push({
          name: 'questionnairesEdit',
          params: {
            questionnaireId: 'sample-id'
          }
        })
      }
    }
  },
  watch: {
    questionnaire: function (val) {
      this.questionnaire = val
    }
  }
}
