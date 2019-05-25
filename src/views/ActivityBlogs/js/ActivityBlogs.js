import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

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
      'fetchActivityBlogs'
    ]),
    loadActivityBlogList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchActivityBlogs({
        data,
        callback: () => {},
        fail: () => {
          this.$toasted.error('Fail to load activity blogs list')
        }
      })
    },
    goToActivityBlogDetail (id) {
      this.$router.push({
        name: 'activityBlogDetail',
        params: { id: id }
      })
    },

    goToEditActivityBlog (id) {
      this.$router.push({
        name: 'editActivityBlog',
        params: { id: id }
      })
    }
  }
}
