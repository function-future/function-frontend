import { mapActions, mapGetters } from 'vuex'
const Editor = () => import('@/components/editor/Editor')

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
      'activityBlog',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchActivityBlogById',
      'createActivityBlog',
      'updateActivityBlog',
      'uploadResource',
      'toast',
      'showBottomNavBar',
      'hideBottomNavBar'
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
      this.checkCurrentUser()
      this.activityBlogDetail = {
        id: this.activityBlog.id || '',
        title: this.activityBlog.title || '',
        description: this.activityBlog.description || ''
      }
      this.imageIds = [ ...this.activityBlog.files.map(i => i.id) ]
    },
    checkCurrentUser () {
      if (this.currentUser.id !== this.activityBlog.author.id) {
        this.$router.push({
          name: 'activityBlogDetail',
          params: { id: this.$route.params.id }
        })
      }
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
      this.toast({
        data: {
          message: 'Fail to upload image, please delete the image and re-upload',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'Fail to load activity blog detail',
          type: 'is-danger'
        }
      })
    },
    successCreateActivityBlog () {
      this.initialState()
      this.$router.push({ name: 'activityBlogs' })
      this.toast({
        data: {
          message: 'Successfully created new activity blog',
          type: 'is-success'
        }
      })
    },
    failCreateActivityBlog () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to create new activity blog',
          type: 'is-danger'
        }
      })
    },
    successUpdateActivityBlog () {
      this.$router.push({
        name: 'activityBlogDetail',
        params: { id: this.activityBlogDetail.id }
      })
      this.toast({
        data: {
          message: 'Successfully update activity blog',
          type: 'is-success'
        }
      })
      this.initialState()
    },
    failUpdateActivityBlog () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to update activity blog',
          type: 'is-danger'
        }
      })
    }
  }
}
