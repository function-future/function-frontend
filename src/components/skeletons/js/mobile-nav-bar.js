import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'

export default {
  name: 'mobileNavBar',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mixins: [
    ChangePageTitleMixins
  ],
  created () {
    this.fetchBreadcrumb()
  },
  computed: {
    breadcrumbAvailable () {
      return this.breadcrumbList
    },
    breadcrumb () {
      return this.breadcrumbList[this.breadcrumbList.length - 2]
    }
  },
  methods: {
    fetchBreadcrumb () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    routeTo (link) {
      this.$router.push({
        name: link
      })
    }
  },
  watch: {
    $route () {
      this.fetchBreadcrumb()
    }
  }
}
