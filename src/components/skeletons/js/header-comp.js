import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      gradesSubmenuVisibility: false,
      questionnaireSubmenuVisibility: false
    }
  },
  computed: {
    ...mapGetters([
      'menuList'
    ]),
    showGrades () {
      return this.gradesSubmenuVisibility
    },
    showQuestionnaire () {
      return this.questionnaireSubmenuVisibility
    }
  },
  methods: {
    toggleGradesMenu () {
      this.gradesSubmenuVisibility = !this.gradesSubmenuVisibility
    },
    toggleQuestionnaireMenu () {
      this.questionnaireSubmenuVisibility = !this.questionnaireSubmenuVisibility
    }
  }
}
