import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
let marked = require('marked')

export default {
  name: 'activityBlogs',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation
  },
  data () {
    return {
      paging: {
        page: 0,
        size: 10
      },
      selectedId: '',
      showDeleteConfirmationModal: false
    }
  },
  created () {
    this.loadActivityBlogList()
  },
  computed: {
    ...mapGetters([
      'activityBlogs'
    ])
  },
  methods: {
    ...mapActions([
      'fetchActivityBlogs',
      'deleteActivityBlogById'
    ]),
    loadActivityBlogList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchActivityBlogs({
        data,
        callback: () => {},
        fail: this.failFetchActivityBlogs
      })
    },
    compileToMarkdown: function (description) {
      return marked(description)
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
    },
    failFetchActivityBlogs () {
      this.$toasted.error('Fail to load activity blogs list')
    },
    successDeleteActivityBlogById () {
      this.$router.push({ name: 'activityBlogs' })
      this.$toasted.success('Successfully delete activity blog')
      this.closeDeleteConfirmationModal()
    },
    failDeleteActivityBlogById () {
      this.$toasted.error('Fail to delete activity blog')
      this.closeDeleteConfirmationModal()
    }
  }
}
