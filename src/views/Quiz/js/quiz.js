import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopy from '@/components/modals/ModalCopy'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'Quiz',
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
        size: 10,
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
      'deleteQuizById',
      'copyQuiz'
    ]),
    initPage () {
      this.fetchQuizList({
        data: {
          batchCode: 'futur3',
          page: this.paging.page,
          pageSize: this.paging.size
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
        batchCode: batchDestination
      }
      let payload = {...this.quizList.find(i => i.id === this.selectedId)}
      payload.batch = batchDestination
      this.copyQuiz({
        data,
        payload,
        callback: this.successSubmitCopyQuiz,
        fail: this.failSubmitCopyQuiz
      })
    },
    successSubmitCopyQuiz () {
      this.selectedId = ''
      this.showCopyModal = false
      this.$toasted.success('Successfully copied quiz')
    },
    failSubmitCopyQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
