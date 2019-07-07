import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopy from '@/components/modals/ModalCopy'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'Assignment',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect,
    ModalDeleteConfirmation,
    ModalCopy,
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        pageSize: 10,
        totalRecords: 0
      },
      showDeleteConfirmationModal: false,
      showCopyModal: false,
      selectedId: ''
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignmentList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAssignmentList',
      'createAssignment',
      'deleteAssignmentById'
    ]),
    initPage () {
      this.fetchAssignmentList({
        data: {
          batchCode: 'futur3',
          page: this.paging.page,
          pageSize: this.paging.pageSize
        },
        callback: this.successFetchingAssignmentList,
        fail: this.failFetchingAssignmentList
      })
    },
    successFetchingAssignmentList (paging) {
      this.paging = paging
    },
    failFetchingAssignmentList () {
      this.$toasted.error('Something went wrong')
    },
    addAssignment () {
      this.$router.push({name: 'addAssignment'})
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToAssignmentDetail (id, batchCode) {
      this.$router.push({
        name: 'assignmentDetail',
        params: {
          id: id
        },
        query: {
          batchCode: batchCode
        }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisAssignment () {
      this.deleteAssignmentById({
        data: {
          batchCode: 'futur3',
          id: this.selectedId
        },
        callback: this.successDeletingAssignment,
        fail: this.failDeletingAssignment
      })
    },
    successDeletingAssignment () {
      this.$router.push({ name: 'assignments' })
      this.$toasted.success('Successfully delete assignment')
      this.closeDeleteConfirmationModal()
    },
    failDeletingAssignment () {
      this.$toasted.error('Something went wrong')
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.initPage()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.initPage()
    },
    openCopyModal (id) {
      this.selectedId = id
      this.showCopyModal = true
    },
    closeCopyModal () {
      this.selectedId = ''
      this.showCopyModal = false
    },
    submitCopyModal (batchDestination) {
      if (batchDestination === '') return
      let data = {
        batchCode: batchDestination,
      }
      let payload = this.assignmentList.find(i => i.id === this.selectedId)
      payload.batch = batchDestination
      console.log(payload)
      this.createAssignment({
        data,
        payload,
        callback: this.successSubmitCopyAssignment,
        fail: this.failSubmitCopyAssignment
      })
    },
    successSubmitCopyAssignment () {
      this.selectedId = ''
      this.showCopyCourseModal = false
    },
    failSubmitCopyAssignment () {
      this.showCopyCourseModal = false
      this.$toasted.error('Something went wrong')
    }
  }
}
