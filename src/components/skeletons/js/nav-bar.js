import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs
  },
  mixins: [
    ChangePageTitleMixins
  ],
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ]),
    loggedIn () {
      if (Object.keys(this.currentUser).length) {
        return true
      } else {
        return false
      }
    },
    name () {
      return this.currentUser.name || ''
    },
    firstName () {
      return /\s/.test(this.name) ? this.name.substr(0, this.name.indexOf(' ')) : this.name
    },
    role () {
      return (this.currentUser && this.currentUser.role &&
        this.currentUser.role.substring(0, 1) + this.currentUser.role.slice(1).toLowerCase()) || ''
    }
  },
  methods: {
    ...mapActions([
      'attemptLogout'
    ]),
    login () {
      if (!this.loggedIn) {
        this.$router.push({ query: { auth: 'login' } })
      }
    },
    goToNotifications () {
      if (this.$route.name === 'notifications') {
        window.location.reload()
      } else {
        this.$router.push({ name: 'notifications' })
      }
    },
    logout () {
      this.attemptLogout({
        callback: this.successAttemptLogout
      })
    },
    successAttemptLogout () {
      this.$cookies.remove('Function-Session')
      this.$router.push({ name: 'feeds' })
      this.isExtend = false
    },
    goToProfile () {
      this.$router.push({ name: 'profile' })
    },
    errorHandler (err) {
      console.log(err)
    }
  }
}
