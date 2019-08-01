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
    },
    breadcrumbs () {
      if (this.breadcrumbList.length > 5) {
        let breadcrumbs = [
          ...this.breadcrumbList.slice(0, 2),
          { name: '...' },
          ...this.breadcrumbList.slice(this.paths.length - 2, this.paths.length) ]
        return breadcrumbs
      }
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
