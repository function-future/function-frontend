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
      'menuList',
      'currentUser'
    ]),
    showGrades () {
      return this.gradesSubmenuVisibility
    },
    showQuestionnaire () {
      return this.questionnaireSubmenuVisibility
    },
    quizRoute () {
      return this.currentUser.role === 'STUDENT' ? 'studentQuizzes' : 'quizBatch'
    },
    assignmentRoute () {
      return this.currentUser.role === 'STUDENT' ? 'studentAssignments' : 'assignmentBatch'
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
