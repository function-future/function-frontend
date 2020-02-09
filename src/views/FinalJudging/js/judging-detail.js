import { mapActions, mapGetters } from 'vuex'
const ComparisonItem = () => import('@/views/FinalJudging/ComparisonItem')
const ModalSelectMultipleStudents = () => import('@/components/modals/ModalSelectMultipleStudents')
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
let marked = require('marked')

export default {
  name: 'JudgingDetail',
  components: {
    ModalSelectMultipleStudents,
    ComparisonItem,
    ModalDeleteConfirmation
  },
  data () {
    return {
      judgingDetail: {
        name: '',
        description: '',
        students: []
      },
      selectedStudents: [],
      isLoading: true,
      editMode: false,
      showSelectStudentModal: false,
      showDeleteConfirmationModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'judging',
      'accessList'
    ]),
    descriptionCompiledMarkdown() {
      return marked(this.judgingDetail.description)
    }
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'updateJudging',
      'deleteJudging',
      'toast'
    ]),
    initPage () {
      this.fetchJudgingDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successFetchingJudgingDetail,
        fail: this.failedFetchingJudgingDetail
      })
    },
    successFetchingJudgingDetail () {
      this.judgingDetail.name = this.judging.name
      this.judgingDetail.description = this.judging.description
      this.judgingDetail.students = this.judging.students
      this.selectedStudents = this.judging.students
      this.isLoading = false
      this.$route.meta.title = this.judging.name
      this.$router.replace({query: {temp: Date.now()}})
      this.$router.replace({query: {temp: undefined}})
    },

    failedFetchingJudgingDetail () {
      this.toast({
        data: {
          message: 'Fail to load judging session',
          type: 'is-danger'
        }
      })
    },
    goToComparison () {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: this.$route.params.judgingId
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
      this.selectedStudents = selectedStudentList
      this.closeSelectStudentModal()
    },
    actionButtonClicked () {
      if (this.editMode) {
        this.judgingDetail.students = []
        this.selectedStudents.forEach((item) => {
          this.judgingDetail.students.push(item.id)
        })
        let data = {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        }
        let payload = {
          id: this.$route.params.judgingId,
          ...this.judgingDetail
        }
        this.updateJudging({
          data,
          payload,
          callback: this.successUpdatingJudging,
          fail: this.failUpdatingJudging
        })
      }
      this.editMode = !this.editMode
    },
    returnButtonClicked () {
      this.editMode ? this.editMode = !this.editMode : this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    successUpdatingJudging () {
      this.toast({
        data: {
          message: 'Successfully updated judging session',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    failUpdatingJudging () {
      this.toast({
        data: {
          message: 'Fail to update judging session',
          type: 'is-danger'
        }
      })
    },
    deleteThisJudging () {
      this.showDeleteConfirmationModal = false
      this.deleteJudging({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successDeletingJudging,
        fail: this.failedDeletingJudging
      })
    },
    successDeletingJudging () {
      this.toast({
        data: {
          message: 'Successfully deleted judging session',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'judgingList'
      })
    },
    failedDeletingJudging () {
      this.toast({
        data: {
          message: 'Fail to delete judging session',
          type: 'is-danger'
        }
      })
    },
    moveToEditPage () {
      this.$router.push({
        name: 'editJudging'
      })
    }
  }
}
