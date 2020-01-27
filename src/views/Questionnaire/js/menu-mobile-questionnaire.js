import { mapGetters } from 'vuex'
import MenuCard from '@/views/LoggingRoom/MenuCard'

export default {
  name: 'MenuMobileQuestionnaire',
  components: {
    MenuCard
  },
  data () {
    return {
      menuMyQuestionnaireIcon: 'clipboard-check',
      menuMyQuestionnaireTitle: 'My Questionnaires',
      menuQuestionnairesIcon: 'list-ol',
      menuQuestionnairesTitle: 'Questionnaires',
      menuQuestionnaireResultsIcon: 'chart-bar',
      menuQuestionnaireResultsTitle: 'Questionnaires Result'
    }
  },
  computed: {
    ...mapGetters([
      'menuList'
    ])
  },
  methods: {
    goToPage (name) {
      this.$router.push({ name: name })
    }
  }
}
