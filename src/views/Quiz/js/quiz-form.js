import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'
import ListItem from '@/components/list/ListItem'
import ModalSelectQuestionBanks from '@/components/modals/ModalSelectQuestionBank'
export default {
  name: 'AddQuiz',
  components: {
    Editor,
    ListItem,
    ModalSelectQuestionBanks
  },
  props: [
    'editMode'
  ],
  data () {
    return {
      quizDetail: {
        title: '',
        description: '',
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
        timeLimit: 0,
        trials: 0,
        questionCount: 0,
        questionBanks: []
      },
      calendarDetails: {
        minDate: new Date(),
        dates: []
      },
      showSelectQuestionBankModal: false,
      isSubmitting: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBanks'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuizById',
      'updateQuizDetail',
      'createQuiz'
    ]),
    initPage () {
      if (this.editMode) {
        this.getQuizDetail()
        return
      }
    },
    getQuizDetail () {
      this.fetchQuizById({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.quizId
        },
        callback: this.successFetchingQuizDetail,
        fail: this.failedFetchingQuizDetail
      })
    },
    successFetchingQuizDetail (response) {
      this.quizDetail = { ...response }
      this.calendarDetails.dates[0] = new Date(response.startDate)
      this.calendarDetails.dates[1] = new Date(response.endDate)
    },
    failedFetchingQuizDetail () {
      this.$toasted.error('Something went wrong')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    validateQuiz () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      this.editMode ? this.updateQuiz() : this.newQuiz()
    },
    updateQuiz () {
      let bankId = []
      this.quizDetail.questionBanks.forEach(bank => {
        bankId.push(bank.id)
      })
      let payload = { ...this.quizDetail }
      payload.questionBanks = bankId
      payload.startDate = this.calendarDetails.dates[0].getTime()
      payload.endDate = this.calendarDetails.dates[1].getTime()
      this.updateQuizDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.quizId
        },
        payload,
        callback: this.successUpdatingQuizDetail,
        fail: this.failedUpdatingQuizDetail
      })
    },
    successUpdatingQuizDetail () {
      this.$toasted.success('Successfully updated this quiz')
      this.$router.push({
        name: 'scoringAdmin'
      })
    },
    failedUpdatingQuizDetail () {
      this.isSubmitting = false
      this.$toasted.error('Something went wrong')
    },
    newQuiz () {
      let bankId = []
      this.quizDetail.questionBanks.forEach(bank => {
        bankId.push(bank.id)
      })
      let payload = { ...this.quizDetail }
      payload.questionBanks = bankId
      payload.startDate = this.calendarDetails.dates[0].getTime()
      payload.endDate = this.calendarDetails.dates[1].getTime()
      this.createQuiz({
        data: {
          batchCode: this.$route.params.batchCode
        },
        payload,
        callback: this.successCreatingQuiz,
        fail: this.failedCreatingQuiz
      })
    },
    successCreatingQuiz () {
      this.$toasted.success('Successfully created a quiz')
      this.$router.push({
        name: 'scoringAdmin'
      })
    },
    failedCreatingQuiz () {
      this.isSubmitting = false
      this.$toasted.error('Something went wrong')
    },
    removeQuestionBank (id) {
      this.quizDetail.questionBanks.forEach((bank, index) => {
        if (bank.id === id)
          this.quizDetail.questionBanks.splice(index, 1)
      })
    },
    toggleQuestionBankSelectModal () {
      this.showSelectQuestionBankModal = true
    },
    closeQuestionBankModal () {
      this.showSelectQuestionBankModal = false
    },
    setSelectedBanks (selectedBank) {
      this.showSelectQuestionBankModal = false
      this.quizDetail.questionBanks = [ ...selectedBank ]
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
