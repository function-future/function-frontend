import { mapGetters } from 'vuex'

export default {
  name: 'UserBar',
  data () {
    return {
      isExtend: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    },
    name () {
      return this.currentUser.name || ''
    },
    firstName () {
      return this.name.substr(0, this.name.indexOf(' '))
    }
  },
  methods: {
    extendUserBar: function () {
      this.isExtend = true
    },
    shrinkUserBar: function () {
      this.isExtend = false
    },
    login () {
      if (!this.loggedIn) {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
