export default {
  created () {
    this.fetchTitle()
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    fetchTitle () {
      this.title = this.$route.meta.title
      document.title = this.$route.meta.title + ' | Function'
    }
  },
  watch: {
    $route () {
      this.fetchTitle()
    }
  }
}
