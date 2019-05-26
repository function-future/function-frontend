import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      activityBlogDetail: {}
    }
  },
  props: [
    'editMode'
  ],
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'activityBlog'
    ])
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchActivityBlogById',
      'createActivityBlog',
      'updateActivityBlog'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
        this.getActivityBlogDetail()
        this.setActivityBlogDetail()
      }
    },
    getActivityBlogDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchActivityBlogById({
        data,
        callback: () => {},
        fail: () => {
          this.$toasted.error('Fail to load activity blog detail')
        }
      })
    },
    setActivityBlogDetail () {
      this.activityBlogDetail = {
        id: this.activityBlog.id || '',
        title: this.activityBlog.title || '',
        description: this.activityBlog.description || ''
      }
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then(callback)
    },
    sendActivityBlog () {
      this.setActivityBlogDetail()
      let data = { ...this.activityBlogDetail }

      this.validateBeforeSubmit((result) => {
        if (result) {
          if (this.editMode) {
            this.sendUpdateActivityBlogData(data)
          } else {
            this.sendCreateActivityBlogData(data)
          }
        }
      })
    },
    sendCreateActivityBlogData (data) {
      this.createActivityBlog({
        data,
        callback: () => {
          this.initialState()
          this.$router.push({ name: 'activityBlogs' })
          this.$toasted.success('Successfully created new activity blog')
        },
        fail: () => {
          this.$toasted.error('Fail to create new activity blog')
        }
      })
    },
    sendUpdateActivityBlogData (data) {
      this.updateActivityBlog({
        data,
        callback: () => {
          this.$router.push({
            name: 'activityBlogDetail',
            params: { id: this.activityBlogDetail.id }
          })
          this.$toasted.success('Successfully update activity blog')
          this.initialState()
        },
        fail: () => {
          this.$toasted.error('Fail to update activity blog')
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
