import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'QuestionBankAddQuestion',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation
  },
  data () {
    return {
      showDeleteConfirmationModal: false,
      selectedId: ''
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankQuestionList',
      'deleteQuestionById'
    ]),
    initPage () {
      this.fetchQuestionBankQuestionList({
        data: {
          bankId: this.$route.params.bankId
        },
        fail: this.failFetchingQuestionBankQuestionList
      })
    },
    failFetchingQuestionBankQuestionList () {
      this.$toasted.error('Something went wrong')
    },
    redirectToAddQuestion () {
      this.$router.push({
        name: 'questionBankAddQuestion'
      })
    },
    redirectToQuestionDetail (id) {
      this.$router.push({
        name: 'questionBankQuestionDetail',
        params: {
          bankId: this.$route.params.bankId,
          questionId: id
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
    deleteThisQuestion () {
      this.deleteQuestionById({
        data: {
          id: this.selectedId,
          bankId: this.$route.params.bankId
        },
        callback: this.successDeletingQuestion,
        fail: this.failDeletingQuestion
      })
    },
    successDeletingQuestion () {
      this.$toasted.success('Successfully deleted question')
      this.closeDeleteConfirmationModal()
      this.initPage()
    },
    failDeletingQuestion () {
      this.$toasted.error('Something went wrong')
    },
  }
}
