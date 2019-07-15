import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import QuestionnaireCard from '../QuestionnaireCard'

export default {
  name: 'Questionnaires',
  components: {
    SearchBar,
    BaseButton,
    QuestionnaireCard
  },
  methods: {
    goToCreate () {
      this.$router.push({
        name: 'questionnairesCreate'
      })
    }
  }
}
