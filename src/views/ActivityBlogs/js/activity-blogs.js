import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'
let marked = require('marked')

export default {
  name: 'activityBlogs',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation,
    BasePagination
  },
  data () {
    return {
      isLoading: false,
      paging: {
        page: 1,
        size: 10
      },
      selectedId: '',
      showDeleteConfirmationModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'activityBlogs',
      'currentUser',
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchActivityBlogs',
      'fetchUserActivityBlogs',
      'deleteActivityBlogById'
    ]),
    initPage () {
      this.paging.page = 1
      this.$route.query.userId ? this.loadUserActivityBlogList() : this.loadActivityBlogList()
    },
    loadActivityBlogList () {
      this.isLoading = true
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchActivityBlogs({
        data,
        callback: this.successLoadActivityBlogList,
        fail: this.failLoadActivityBlogList
      })
    },
    loadUserActivityBlogList () {
      this.isLoading = true
      this.paging = { ...this.paging }
      let data = {
        ...this.paging,
        userId: this.$route.query.userId
      }
      this.fetchUserActivityBlogs({
        data,
        callback: this.successLoadActivityBlogList,
        fail: this.failLoadActivityBlogList
      })
    },
    successLoadActivityBlogList (paging) {
      this.isLoading = false
      this.paging = paging
    },
    failLoadActivityBlogList () {
      this.isLoading = false
      this.$toasted.error('Fail to load activity blogs list')
    },
    compileToMarkdown: function (description) {
      return marked(this.showLimitedPreviewText(description.replace(/\!\[.*\]\(.*\)/,'')))
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 350
      return text.length > maximumCharacters ? text.slice(0, maximumCharacters) + '...' : text
    },
    goToActivityBlogDetail (id) {
      this.$router.push({
        name: 'activityBlogDetail',
        params: { id: id }
      })
    },
    goToAddActivityBlog () {
      this.$router.push({
        name: 'addActivityBlog'
      })
    },
    goToEditActivityBlog (id) {
      this.$router.push({
        name: 'editActivityBlog',
        params: { id: id }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisActivityBlog () {
      let id = { 'id': this.selectedId }
      let data = { ...id }

      this.deleteActivityBlogById({
        data,
        callback: this.successDeleteActivityBlogById,
        fail: this.failDeleteActivityBlogById
      })
      this.closeDeleteConfirmationModal()
    },
    successDeleteActivityBlogById () {
      this.loadActivityBlogList()
      this.$toasted.success('Successfully delete activity blog')
    },
    failDeleteActivityBlogById () {
      this.$toasted.error('Fail to delete activity blog')
    },
    loadPage (page) {
      this.paging.page = page
      this.loadActivityBlogList()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.loadActivityBlogList()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.loadActivityBlogList()
    },
    goToUserBlog (id) {
      this.$router.push({
        query: { userId: id }
      })
    }
  },
  watch: {
    '$route.query.userId' () {
      this.initPage()
    }
  }
}
