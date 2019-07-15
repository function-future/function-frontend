import BaseButton from '@/components/BaseButton'
import QuestionnaireForm from '../QuestionnaireForm'

export default {
  name: 'QuestionnairesCreate',
  components: {
    BaseButton,
    QuestionnaireForm
  },
  methods: {
    goToCreate () {
      this.$router.push({
        name: 'questionnairesEdit',
        params: {
          questionnaireId: 'sample-id'
        }
      })
    }
  }
}
