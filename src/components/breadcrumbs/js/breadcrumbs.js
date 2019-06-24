export default {
  name: 'breadcrumbs',
  data () {
    return {
      breadcrumbList: []
    }
  },
  created () {
    this.updateList()
  },
  computed: {
    breadcrumbAvailable () {
      return this.breadcrumbList
    }
  },
  methods: {
    updateList () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    routeTo (index) {
      this.$router.push({
        name: this.breadcrumbList[index].link
      })
    }
  },
  watch: {
    $route () {
      this.updateList()
    }
  }
}