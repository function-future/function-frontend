import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'
import UserListItem from '@/components/list/UserListItem'
import EmptyState from '@/components/emptyState/EmptyState'
import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'

export default {
  name: 'judgingForm',
  components: {
    Editor,
    UserListItem,
    EmptyState,
    ModalSelectMultipleStudents
  },
  data () {
    return {
      judgingDetail: {
        name: '',
        description: '',
        students: []
      },
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
    },
    studentNotEmpty() {
      return !!(this.judgingDetail.students && this.judgingDetail.students.length)
    }
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'createJudging',
      'updateJudging',
      'initialState',
      'toast'
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
    successFetchingJudgingDetail (response) {
      this.judgingDetail = { ...response }
      console.log(this.judgingDetail)
    },
    failedFetchingJudgingDetail () {
      this.toast({
        data: {
          message: 'Fail to load judging session',
          type: 'is-danger'
        }
      })
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
      let payload = { ...this.judgingDetail }
      payload.students = []
      this.judgingDetail.students.forEach(student => {
        payload.students.push(student.id)
      })
      this.createJudging({
        data: {
          batchCode: this.$route.params.batchCode
        },
        payload,
        callback: this.successCreatingJudgingDetail,
        fail: this.failedCreatingJudgingDetail
      })
    },
    successCreatingJudgingDetail () {
      this.initialState()
      this.$router.push({ name: 'judgingList' })
      this.toast({
        data: {
          message: 'Successfully created a judging session',
          type: 'is-success'
        }
      })
    },
    failedCreatingJudgingDetail () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to create judging session',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'Successfully updated judging session',
          type: 'is-success'
        }
      })
      this.initialState()
    },
    failedUpdatingJudgingDetail () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to update judging session',
          type: 'is-danger'
        }
      })
    },
    cancel () {
      this.$router.push({ name: 'judgingList' })
    },
    removeStudentFromJudging (student) {
      this.judgingDetail.students.forEach((item, index) => {
        if (item.id === student.id) {
          this.judgingDetail.students.splice(index, 1)
        }
      })
    },
    toggleSelectStudentModal () {
      this.showSelectStudentModal = true
    },
    closeSelectStudentModal () {
      this.showSelectStudentModal = false
    },
    setSelectedStudents (selectedStudentList) {
      this.judgingDetail.students = selectedStudentList
      console.log(this.judgingDetail)
      this.closeSelectStudentModal()
    },
  }
}
