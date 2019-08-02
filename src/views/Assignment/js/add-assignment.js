import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import BaseSelect from '@/components/BaseSelect'
import { mapActions } from 'vuex'

export default {
  name: 'AddAssignment',
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton,
    BaseSelect
  },
  data () {
    return {
      assignment: {
        title: '',
        description: '',
        deadline: new Date(),
        batchCode: '',
        file: ''
      },
      uploadingFile: false,
      filePreviewName: '',
      file: {}
    }
  },
  methods: {
    ...mapActions([
      'createAssignment',
      'uploadMaterial'
    ]),
    cancel () {
      this.$router.go(-1)
    },
    successCreateAssignment () {
      this.$router.push({name: 'assignments'})
      this.$toasted.success('Successfully created new assignment')
    },
    failCreatingAssignment () {
      this.$toasted.error('Something went wrong')
    },
    saveAssignment () {
      let payload = { ...this.assignment }
      payload.deadline = new Date(payload.deadline).getTime()
      payload.batchCode = this.$route.params.batchCode
      this.createAssignment({
        payload,
        data: {
          batchCode: this.$route.params.batchCode
        },
        callback: this.successCreateAssignment,
        fail: this.failCreatingAssignment
      })
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
        source: 'ASSIGNMENT',
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
      this.assignment.file = response.id
      this.filePreviewName = this.file.name
    },
    failUploadMaterial () {
      this.uploadingFile = false
      this.filePreviewName = 'Fail to upload material, please try again'
      this.$toasted.error('Fail to upload material, please try again')
    }
  }
}
