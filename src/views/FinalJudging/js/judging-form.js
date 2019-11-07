import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'
import UserListItem from '@/components/list/UserListItem'
import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'

export default {
  name: 'judgingForm',
  components: {
    Editor,
    UserListItem,
    ModalSelectMultipleStudents
  },
  data () {
    return {
      judgingDetail: {},
      isSubmitting: false,
      showSelectStudentModal: false
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
      'judging'
    ]),
    studentList () {
      return this.judgingDetail.students || []
    },
    disableButtonAddStudent () {
      return this.studentList.length >= 3
    }
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'createJudging',
      'updateJudging',
      'initialState'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
        this.getJudgingDetail()
      }
    },
    getJudgingDetail () {
      this.fetchJudgingDetail({
        data: {
          judgingId: this.$route.params.judgingId,
          batchCode: this.$route.params.batchCode
        },
        callback: this.successFetchingJudgingDetail,
        fail: this.failedFetchingJudgingDetail
      })
    },
    successFetchingJudgingDetail () {
      this.setJudgingDetail()
    },
    failedFetchingJudgingDetail () {
      this.$toasted.error('Something went wrong')
    },
    setJudgingDetail () {
      this.judgingDetail = { ...this.judging }
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    validateJudging () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      this.editMode ? this.updateJudgingDetail() : this.createJudgingDetail()
    },
    createJudgingDetail () {
      this.createJudging({
        data: {
          batchCode: this.$route.params.batchCode
        },
        payload: { ...this.judgingDetail },
        callback: this.successCreatingJudgingDetail,
        fail: this.failedCreatingJudgingDetail
      })
    },
    successCreatingJudgingDetail () {
      this.initialState()
      this.$router.push({ name: 'judgingList' })
      this.$toasted.success('Successfully created new judging session')
    },
    failedCreatingJudgingDetail () {
      this.isSubmitting = false
      this.$toasted.error('Something went wrong')
    },
    updateJudgingDetail () {
      let students = []
      this.judgingDetail.students.forEach((student) => {
        students.push(student.id)
      })
      let payload = {
        id: this.$route.params.judgingId,
        description: this.judgingDetail.description || '',
        name: this.judgingDetail.name || '',
        students: students
      }
      this.updateJudging({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        payload,
        callback: this.successUpdatingJudgingDetail,
        fail: this.failedUpdatingJudgingDetail
      })
    },
    successUpdatingJudgingDetail () {
      this.$router.push({
        name: 'judgingDetail',
        params: { id: this.judgingDetail.id }
      })
      this.$toasted.success('Successfully updated judging session')
      this.initialState()
    },
    failedUpdatingJudgingDetail () {
      this.isSubmitting = false
      this.$toasted.error('Something went wrong')
    },
    cancel () {
      this.$router.push({ name: 'judgingList' })
    },
    removeStudentFromJudging (student) {
      this.judgingDetail.students.splice(this.judgingDetail.students.indexOf(student), 1)
    },
    toggleSelectStudentModal () {
      this.showSelectStudentModal = true
    },
    closeSelectStudentModal () {
      this.showSelectStudentModal = false
    },
    setSelectedStudents (selectedStudentList) {
      this.judgingDetail.students = selectedStudentList
      this.closeSelectStudentModal()
    },
  }
}
