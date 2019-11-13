import { mapActions, mapGetters } from 'vuex'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ListItem from '@/components/list/ListItem'
let marked = require('marked')

export default {
  name: 'activityBlogs',
  components: {
    ListItem,
    ModalDeleteConfirmation
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
    ]),
    userId () {
      return this.$route.query.userId || ''
    }
  },
  methods: {
    ...mapActions([
      'fetchActivityBlogs',
      'fetchUserActivityBlogs',
      'deleteActivityBlogById'
    ]),
    initPage () {
      this.userId ? this.loadUserActivityBlogList() : this.loadActivityBlogList()
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
        userId: this.userId
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
      return marked(this.showLimitedPreviewText(description.replace(/<img.*[^>]>/, '$1')))
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
      this.initPage()
      this.$toasted.success('Successfully delete activity blog')
    },
    failDeleteActivityBlogById () {
      this.$toasted.error('Fail to delete activity blog')
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    goToUserBlog (id) {
      this.$router.push({
        query: { userId: id }
      })
    },
    goToActivityBlogs () {
      this.$router.push({ name: 'activityBlogs' })
    }
  },
  watch: {
    userId () {
      this.paging.page = 1
      this.initPage()
    }
  }
}
