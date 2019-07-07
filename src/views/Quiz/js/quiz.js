import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopyQuiz from '@/components/modals/ModalCopyQuiz'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'Quiz',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect,
    ModalDeleteConfirmation,
    ModalCopyQuiz,
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
      'quizList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuizList',
      'deleteQuizById'
    ]),
    initPage () {
      this.fetchQuizList({
        data: {
          batchCode: 'futur3',
          page: this.paging.page,
          pageSize: this.paging.pageSize
        },
        callback: this.successFetchingQuizList,
        fail: this.failFetchingQuizList
      })
    },
    successFetchingQuizList (paging) {
      this.paging = paging
    },
    failFetchingQuizList () {
      this.$toasted.error('Something went wrong')
    },
    addQuiz () {
      this.$router.push({ name: 'addQuiz' })
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToQuizDetail (id, batch) {
      this.$router.push({
        name: 'quizDetail',
        params: {
          quizId: id
        },
        query: {
          batchCode: batch
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
    deleteThisQuiz () {
      this.deleteQuizById({
        data: {
          batchCode: 'futur3',
          id: this.selectedId
        },
        callback: this.successDeletingQuiz,
        fail: this.failedDeletingQuiz
      })
    },
    successDeletingQuiz () {
      this.$router.push({ name: 'quizzes' })
      this.$toasted.success('Successfully delete quiz')
      this.closeDeleteConfirmationModal()
    },
    failedDeletingQuiz () {
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
        code: batchDestination,
        content: {
          originBatch: this.$route.params.code,
          courses: [ ...this.selectedIds ]
        }
      }
      this.createQuiz({
        data,
        callback: this.successSubmitCopyQuiz,
        fail: this.failSubmitCopyQuiz
      })
    },
    successSubmitCopyQuiz () {
      this.selectedIds = []
      this.showCopyCourseModal = false
    },
    failSubmitCopyQuiz () {
      this.showCopyCourseModal = false
      this.$toasted.error('Fail to copy course, please try again')
    },
  }
}
