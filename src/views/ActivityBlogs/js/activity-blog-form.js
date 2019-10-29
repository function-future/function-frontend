import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      activityBlogDetail: {},
      imageIds: [],
      isSubmitting: false,
      uploadingFile: false
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
      }
    },
    getActivityBlogDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchActivityBlogById({
        data,
        callback: this.setActivityBlogDetail,
        fail: this.failFetchActivityBlogById
      })
    },
    setActivityBlogDetail () {
      this.activityBlogDetail = {
        id: this.activityBlog.id || '',
        title: this.activityBlog.title || '',
        description: this.activityBlog.description || ''
      }
      this.imageIds = [ ...this.activityBlog.files.map(i => i.id) ]
    },
    $imgAdd ($file) {
      this.uploadingFile = true
      let data = new FormData()
      data.append('file', $file)
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }

      this.uploadResource({
        data,
        configuration,
        callback: this.successUploadResource,
        fail: this.failUploadResource
      })
    },
    successUploadResource (response) {
      this.uploadingFile = false
      this.$refs.editor.addImage(response.file.full)
      this.imageIds.push(response.id)
    },
    failUploadResource () {
      this.uploadingFile = false
      this.$toasted.error('Fail to upload image, please delete the image and re-upload')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    sendActivityBlog () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      let data = {
        ...this.activityBlogDetail,
        files: this.imageIds
      }
      this.editMode ? this.sendUpdateActivityBlogData(data) : this.sendCreateActivityBlogData(data)
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
      this.isSubmitting = false
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
      this.isSubmitting = false
      this.$toasted.error('Fail to update activity blog')
    }
  }
}
