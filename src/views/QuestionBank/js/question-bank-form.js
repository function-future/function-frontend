import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  name: 'QuestionBankForm',
  props: [
    'editMode'
  ],
  components: {
    Editor
  },
  data () {
    return {
      questionBankDetail: {
        id: '',
        title: '',
        description: ''
      },
      isSubmitting: false
    }
  },
  created() {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBank'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankDetail',
      'createQuestionBank',
      'updateQuestionBank',
      'toast'
    ]),
    initPage() {
      if (!!this.editMode) {
        this.getBankDetail()
      }
    },
    getBankDetail () {
      this.fetchQuestionBankDetail({
        data: {
          bankId: this.$route.params.id
        },
        callback: this.successFetchingQuestionBankDetail,
        fail: this.failedFetchingQuestionBankDetail
      })
    },
    successFetchingQuestionBankDetail (response) {
      this.questionBankDetail = { ...response }
    },
    failedFetchingQuestionBankDetail () {
      this.toast({
        data: {
          message: 'Fail to load question bank',
          type: 'is-error'
        }
      })
    },
    submitQuestionBank () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    validationSuccess () {
      this.isSubmitting = true
      let data = {
        ...this.questionBank
      }
      this.editMode ? this.updateBank(data) : this.createBank(data)
    },
    createBank () {
      this.createQuestionBank({
        payload: { ...this.questionBankDetail },
        callback: this.successCreatingQuestionBank,
        failed: this.failedCreatingQuestionBank
      })
    },
    successCreatingQuestionBank () {
      this.toast({
        data: {
          message: 'Successfully created a question bank',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'questionBanks'
      })
    },
    failedCreatingQuestionBank () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to create question bank',
          type: 'is-error'
        }
      })
    },
    updateBank () {
      this.updateQuestionBank({
        data: {
          bankId: this.$route.params.id
        },
        payload: { ...this.questionBankDetail },
        callback: this.successUpdatingQuestionBank,
        fail: this.failedUpdatingQuestionBank
      })
    },
    successUpdatingQuestionBank () {
      this.toast({
        message: 'Successfully update question bank',
        type: 'is-success'
      })
      this.$router.push({
        name: 'questionBankDetail',
        params: {
          bankId: this.$route.params.id
        }
      })
    },
    failedUpdatingQuestionBank () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to update question bank',
          type: 'is-error'
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
