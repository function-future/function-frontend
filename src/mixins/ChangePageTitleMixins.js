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
    }
  },
  watch: {
    $route () {
      this.title = this.$route.meta.title
    }
  }
}
