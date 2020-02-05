import { mapActions, mapGetters } from 'vuex'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
let marked = require('marked')

export default {
  name: 'activityBlogDetail',
  components: {
    ModalDeleteConfirmation
  },
  created () {
    this.initialState()
    this.getActivityBlogDetail()
  },
  data () {
    return {
      showDeleteConfirmationModal: false,
      activityBlogDescriptionMarkdown: ''
    }
  },
  computed: {
    ...mapGetters([
      'activityBlog',
      'currentUser',
      'accessList'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.activityBlogDescriptionMarkdown)
    },
    isAuthor () {
      return (this.currentUser && this.currentUser.id) === this.authorId
    },
    authorId () {
      return this.activityBlog && this.activityBlog.author && this.activityBlog.author.id
    },
    authorName () {
      return this.activityBlog && this.activityBlog.author && this.activityBlog.author.name
    }
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchActivityBlogById',
      'deleteActivityBlogById',
      'toast'
    ]),
    getActivityBlogDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }

      this.fetchActivityBlogById({
        data,
        callback: this.successFetchActivityBlogById,
        fail: this.failFetchActivityBlogById
      })
    },
    goToEditActivityBlog () {
      this.$router.push({
        name: 'editActivityBlog',
        params: { id: this.$route.params.id }
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteThisActivityBlog () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }

      this.deleteActivityBlogById({
        data,
        callback: this.successDeleteActivityBlogById,
        fail: this.failDeleteActivityBlogById
      })
    },
    successFetchActivityBlogById () {
      this.activityBlogDescriptionMarkdown = this.activityBlog.description
    },
    failFetchActivityBlogById () {
      this.toast({
        data: {
          message: 'Fail to load activity blog detail',
          type: 'is-danger'
        }
      })
    },
    successDeleteActivityBlogById () {
      this.$router.push({ name: 'activityBlogs' })
      this.toast({
        data: {
          message: 'Successfully delete activity blog',
          type: 'is-success'
        }
      })
    },
    failDeleteActivityBlogById () {
      this.toast({
        data: {
          message: 'Fail to delete activity blog',
          type: 'is-danger'
        }
      })
      this.showDeleteConfirmationModal = false
    }
  }
}
