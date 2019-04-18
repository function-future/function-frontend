export default {
  data () {
    return {
      showGrades: false
    }
  },
  computed: {
    showGrades () {
      return this.showGrades
    }
  },
  methods: {
    toggleGradesMenu () {
      this.showGrades = !this.showGrades
    }
  }
}
