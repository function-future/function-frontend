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
      activityBlogDetail: {},
      img_file: {},
      imageIds: []
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
      'updateActivityBlog',
      'uploadResource'
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
        fail: this.failFetchActivityBlogById
      })
    },
    setActivityBlogDetail () {
      this.activityBlogDetail = {
        id: this.activityBlog.id || '',
        title: this.activityBlog.title || '',
        description: this.activityBlog.description || ''
      }
    },
    $imgAdd (pos, $file) {
      let data = new FormData()
      data.append('file', $file)
      this.img_file[pos] = $file
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }

      this.uploadResource({
        data,
        configuration,
        callback: (response) => {
          this.$refs.md.$img2Url(pos, response.file.full)
          this.imageIds.push(response.id)
        },
        fail: this.failUploadResource
      })
    },
    failUploadResource () {
      this.$toasted.error('Fail to upload image, please delete the image and re-upload')
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then(callback)
    },
    sendActivityBlog () {
      let data = {
        ...this.activityBlogDetail,
        files: this.imageIds
      }

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
        callback: this.successCreateActivityBlog,
        fail: this.failCreateActivityBlog
      })
    },
    sendUpdateActivityBlogData (data) {
      this.updateActivityBlog({
        data,
        callback: this.successUpdateActivityBlog,
        fail: this.failUpdateActivityBlog
      })
    },
    cancel () {
      this.$router.push({ name: 'activityBlogs' })
    },
    failFetchActivityBlogById () {
      this.$toasted.error('Fail to load activity blog detail')
    },
    successCreateActivityBlog () {
      this.initialState()
      this.$router.push({ name: 'activityBlogs' })
      this.$toasted.success('Successfully created new activity blog')
    },
    failCreateActivityBlog () {
      this.$toasted.error('Fail to create new activity blog')
    },
    successUpdateActivityBlog () {
      this.$router.push({
        name: 'activityBlogDetail',
        params: { id: this.activityBlogDetail.id }
      })
      this.$toasted.success('Successfully update activity blog')
      this.initialState()
    },
    failUpdateActivityBlog () {
      this.$toasted.error('Fail to update activity blog')
    }
  }
}
