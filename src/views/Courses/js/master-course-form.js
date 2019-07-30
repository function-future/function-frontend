import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'masterCourseForm',
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
      masterCourseData: {
        title: '',
        description: '',
        material: []
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
      'masterCourse'
    ])
  },
  methods: {
    ...mapActions([
      'fetchMasterCourseById',
      'createMasterCourse',
      'updateMasterCourse',
      'uploadMaterial'
    ]),
    initPage () {
      if (this.editMode) {
        this.fetchMasterCourse()
      }
    },
    fetchMasterCourse () {
      let data = {
        id: this.$route.params.id
      }
      this.fetchMasterCourseById({
        data,
        callback: this.successFetchMasterCourseById,
        fail: this.failFetchMasterCourseById
      })
    },
    successFetchMasterCourseById () {
      this.masterCourseData = this.masterCourse
      this.filePreviewName = this.masterCourse.material
    },
    failFetchMasterCourseById () {
      this.$toasted.error('Fail to load master course detail, please refresh the page')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    sendMasterCourse () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      const data = {
        id: this.$route.params.id,
        content: { ...this.masterCourseData }
      }
      if (this.editMode) {
        this.updateMasterCourse({
          data,
          callback: this.successCreateOrEditMasterCourse,
          fail: this.failCreateOrEditMasterCourse
        })
      } else {
        this.createMasterCourse({
          data,
          callback: this.successCreateOrEditMasterCourse,
          fail: this.failCreateOrEditMasterCourse
        })
      }
    },
    successCreateOrEditMasterCourse () {
      this.$router.push({ name: 'masterCourses' })
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'created new'
      this.$toasted.success('Successfully ' + msg + ' master course')
    },
    failCreateOrEditMasterCourse () {
      this.isSubmitting = false
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'create new'
      this.$toasted.error('Fail to ' + msg + ' master course')
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
      this.masterCourseData.material = [ response.id ]
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
          name: 'masterCourseDetail',
          params: { id: this.$route.params.id }
        })
      } else {
        this.$router.push({ name: 'masterCourses' })
      }
    },
  }
}
