import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
let marked = require('marked')

export default {
  name: 'activityBlogDetail',
  components: {
    BaseButton,
    BaseCard,
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
      'activityBlog'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.activityBlogDescriptionMarkdown)
    }
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchActivityBlogById',
      'deleteActivityBlogById'
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
      this.$toasted.error('Fail to load activity blog detail')
    },
    successDeleteActivityBlogById () {
      this.$router.push({ name: 'activityBlogs' })
      this.$toasted.success('Successfully delete activity blog')
    },
    failDeleteActivityBlogById () {
      this.$toasted.error('Fail to delete activity blog')
      this.showDeleteConfirmationModal = false
    }
  }
}
