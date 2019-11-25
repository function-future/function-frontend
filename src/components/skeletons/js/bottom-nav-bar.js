import { mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    }
  },
  methods: {
    goToPage (name) {
      if (!this.loggedIn && name !== 'feeds') {
        this.$router.push({ query: { auth: 'login' } })
        return
      }
      this.$router.push({ name: name })
    }
  }
}
