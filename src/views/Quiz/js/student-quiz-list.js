import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopy from '@/components/modals/ModalCopy'
import BasePagination from '@/components/BasePagination'
let marked = require('marked')

export default {
  name: 'StudentQuizList',
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
      'studentQuizList',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStudentQuizList',
    ]),
    initPage () {
      this.fetchStudentQuizList({
        data: {
          batchCode: this.currentUser.batchCode,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingStudentQuizList,
        fail: this.failFetchingStudentQuizList
      })
    },
    successFetchingStudentQuizList (paging) {
      this.paging = paging
    },
    failFetchingStudentQuizList () {
      this.$toasted.error('Something went wrong')
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToQuizDetail (id) {
      this.$router.push({
        name: 'studentQuizDetail',
        params: {
          studentId: this.currentUser.id,
          quizId: id
        }
      })
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
    descriptionCompiledMarkdown: function (description) {
      return marked(description)
    }
  }
}
