import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'courseForm',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: false,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: false,
        help: true,
        undo: false,
        redo: false,
        trash: false,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      },
      courseData: {
        title: '',
        description: '',
        material: '',
        materialId: ''
      },
      uploadingFile: false,
      filePreviewName: '',
      file: {},
      isSubmitting: false
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
      'course'
    ]),
    courseMaterialId () {
      return this.courseData.materialId ? [ this.courseData.materialId ] : []
    }
  },
  methods: {
    ...mapActions([
      'fetchCourseById',
      'createCourse',
      'updateCourse',
      'uploadMaterial'
    ]),
    initPage () {
      if (this.editMode) {
        this.fetchCourse()
      }
    },
    fetchCourse () {
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id
      }
      this.fetchCourseById({
        data,
        callback: this.successFetchCourseById,
        fail: this.failFetchCourseById
      })
    },
    successFetchCourseById () {
      this.courseData = this.course
      this.filePreviewName = this.course.material
    },
    failFetchCourseById () {
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
        code: this.$route.params.code,
        content: {
          title: this.courseData.title,
          description: this.courseData.description,
          material: this.courseMaterialId
        }
      }
      if (this.editMode) {
        this.updateCourse({
          data,
          callback: this.successCreateOrEditCourse,
          fail: this.failCreateOrEditCourse
        })
      } else {
        this.createCourse({
          data,
          callback: this.successCreateOrEditCourse,
          fail: this.failCreateOrEditCourse
        })
      }
    },
    successCreateOrEditCourse () {
      this.$router.push({
        name: 'courses',
        params: {
          code: this.$route.params.code
        }
      })
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'created new'
      this.$toasted.success('Successfully ' + msg + ' course')
    },
    failCreateOrEditCourse () {
      this.isSubmitting = false
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'create new'
      this.$toasted.error('Fail to ' + msg + ' course')
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
      if (this.editMode) {
        this.$router.push({
          name: 'courseDetail',
          params: {
            code: this.$route.params.code,
            id: this.$route.params.id
          }
        })
      } else {
        this.$router.push({
          name: 'courses',
          params: { code: this.$route.params.code }
        })
      }
    }
  }
}
