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
      if (this.breadcrumbList.length > 4) {
        return [
          ...this.breadcrumbList.slice(0, 2),
          { name: '...' },
          ...this.breadcrumbList.slice(this.breadcrumbList.length - 2, this.breadcrumbList.length)
        ]
      }
      return this.breadcrumbList
    }
  },
  methods: {
    updateList () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    routeTo (breadcrumb) {
      if (!breadcrumb.link) return
      this.$router.push({
        name: breadcrumb.link,
        ...breadcrumb.params
      })
    }
  },
  watch: {
    $route () {
      this.updateList()
    }
  }
}
