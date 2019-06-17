export default {
  data () {
    return {
      gradesSubmenuVisibility: false
    }
  },
  computed: {
    showGrades () {
      return this.gradesSubmenuVisibility
    }
  },
  methods: {
    toggleGradesMenu () {
      this.gradesSubmenuVisibility = !this.gradesSubmenuVisibility
    }
  }
}
