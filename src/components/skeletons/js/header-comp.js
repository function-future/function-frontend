import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      gradesSubmenuVisibility: false
    }
  },
  computed: {
    ...mapGetters([
      'menuList'
    ]),
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
