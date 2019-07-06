export default {
  name: 'UserBar',
  data () {
    return {
      isExtend: '',
      name: 'Karnando Sepryan'
    }
  },
  computed: {
    loggedIn () {
      return false
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
