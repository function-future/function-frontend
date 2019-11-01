import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  name: 'courseForm',
  components: {
    Editor
  },
  data () {
    return {
      courseData: {
        title: '',
        description: '',
        material: '',
        materialId: ''
      },
      uploadingFile: false,
      filePreviewName: 'No file uploaded',
      file: {},
      isSubmitting: false
    }
  },
  props: [
    'editMode',
    'master'
  ],
  created () {
    this.initPage()
  },
  computed: {
    courseMaterialId () {
      return this.courseData.materialId ? [ this.courseData.materialId ] : []
    },
    message () {
      return this.editMode ? 'edit' : 'create new'
    },
    courseType () {
      return this.master ? ' master course' : ' course'
    }
  },
  methods: {
    ...mapActions([
      'fetchCourseById',
      'fetchMasterCourseById',
      'createCourse',
      'createMasterCourse',
      'updateCourse',
      'updateMasterCourse',
      'uploadMaterial'
    ]),
    initPage () {
      if (this.editMode) {
        this.fetchData()
      }
    },
    fetchData () {
      this.master ? this.fetchMasterCourse() : this.fetchCourse()
    },
    fetchMasterCourse () {
      let data = { id: this.$route.params.id }
      this.fetchMasterCourseById({
        data,
        callback: this.successFetchById,
        fail: this.failFetchById
      })
    },
    fetchCourse () {
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id
      }
      this.fetchCourseById({
        data,
        callback: this.successFetchById,
        fail: this.failFetchById
      })
    },
    successFetchById (response) {
      this.courseData = response
      this.filePreviewName = this.courseData.material || 'No file uploaded'
    },
    failFetchById () {
      this.$toasted.error('Fail to load course detail, please refresh the page')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    sendCourse () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      const data = {
        id: this.$route.params.id,
        content: {
          title: this.courseData.title,
          description: this.courseData.description,
          material: this.courseMaterialId
        }
      }
      this.master ? this.submitMasterCourse(data) : this.submitCourse(data)
    },
    submitMasterCourse (data) {
      this.editMode ? this.submitUpdateMasterCourse(data) : this.submitCreateMasterCourse(data)
    },
    submitCourse (data) {
      const masterData = {
        code: this.$route.params.code,
        ...data
      }
      this.editMode ? this.submitUpdateCourse(masterData) : this.submitCreateCourse(masterData)
    },
    submitUpdateMasterCourse (data) {
      this.updateMasterCourse({
        data,
        callback: this.successCreateOrEditCourse,
        fail: this.failCreateOrEditCourse
      })
    },
    submitCreateMasterCourse (data) {
      this.createMasterCourse({
        data,
        callback: this.successCreateOrEditMasterCourse,
        fail: this.failCreateOrEditMasterCourse
      })
    },
    submitUpdateCourse (data) {
      this.updateCourse({
        data,
        callback: this.successCreateOrEditCourse,
        fail: this.failCreateOrEditCourse
      })
    },
    submitCreateCourse (data) {
      this.createCourse({
        data,
        callback: this.successCreateOrEditCourse,
        fail: this.failCreateOrEditCourse
      })
    },
    successCreateOrEditCourse () {
      this.backToCourseList()
      this.isSubmitting = false
      this.$toasted.success('Successfully ' + this.message + this.courseType)
    },
    failCreateOrEditCourse () {
      this.isSubmitting = false
      this.$toasted.error('Fail to ' + this.message + this.courseType)
    },
    onFileChange (e) {
      this.file = e.target.files[0]
      this.materialUpload(this.file)
    },
    materialUpload (file) {
      this.uploadingFile = true
      let formData = new FormData()
      formData.append('file', file)
      let data = {
        source: 'COURSE',
        resources: formData
      }
      data = { ...data }
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.uploadMaterial({
        data,
        configuration,
        callback: this.successUploadMaterial,
        fail: this.failUploadMaterial
      })
    },
    successUploadMaterial (response) {
      this.uploadingFile = false
      this.courseData.materialId = response.id
      this.filePreviewName = this.file.name
    },
    failUploadMaterial () {
      this.uploadingFile = false
      this.filePreviewName = 'Fail to upload material, please try again'
      this.$toasted.error('Fail to upload material, please try again')
    },
    cancel () {
      this.editMode ? this.backToDetail() : this.backToCourseList()
    },
    backToDetail () {
      this.master ? this.backToMasterCourseDetail() : this.backToCourseDetail()
    },
    backToCourseDetail () {
      this.$router.push({
        name: 'courseDetail',
        params: {
          code: this.$route.params.code,
          id: this.$route.params.id
        }
      })
    },
    backToMasterCourseDetail () {
      this.$router.push({
        name: 'masterCourseDetail',
        params: { id: this.$route.params.id }
      })
    },
    backToCourseList () {
      this.$router.push({
        name: 'courses',
        query: { tab: this.master ? 'master' : 'batch' }
      })
    }
  }
}
