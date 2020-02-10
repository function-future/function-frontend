import { mapGetters } from 'vuex'

export default {
  name: 'MenuBar',
  data () {
    return {
      showFalse: false,
      gradesSubmenuVisibility: false,
      questionnaireSubmenuVisibility: false,
      loggedInTemp: {}
    }
  },
  watch: {
    currentUser () {
      this.loggedIn
    }
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ]),
    loggedIn () {
      if (!Object.keys(this.currentUser).length) {
        this.questionnaireSubmenuVisibility = false
      }
    },
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
      if (this.questionnaireSubmenuVisibility) this.questionnaireSubmenuVisibility = !this.questionnaireSubmenuVisibility
    },
    toggleQuestionnaireMenu () {
      this.questionnaireSubmenuVisibility = !this.questionnaireSubmenuVisibility
      if (this.gradesSubmenuVisibility) this.gradesSubmenuVisibility = !this.gradesSubmenuVisibility
    },
    isActive (name) {
      return this.$route.name === name
    },
    updateViewKey () {
      this.$emit('updateViewKey')
    }
  }
}
