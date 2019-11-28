import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  name: 'QuestionForm',
  props: [
    'editMode'
  ],
  components: {
    Editor
  },
  data () {
    return {
      questionDetail: {
        label: '',
        options: [
          { label: '' },
          { label: '' },
          { label: '' },
          { label: '' }
        ]
      },
      correctAnswer: ''
    }
  },
  computed: {
    ...mapGetters([
      'question',
      'accessList'
    ]),
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchQuestionDetail',
      'createQuestion',
      'updateQuestion'
    ]),
    initPage () {
      if (this.editMode) {
        this.getQuestionDetail()
      }
    },
    getQuestionDetail () {
      this.fetchQuestionDetail({
        data: {
          bankId: this.$route.params.bankId,
          questionId: this.$route.params.questionId
        },
        callback: this.successFetchingQuestionDetail,
        fail: this.failFetchingQuestionDetail
      })
    },
    successFetchingQuestionDetail (response) {
      this.questionDetail = { ...response }
      this.questionDetail.options.forEach((option, idx) => {
        if (option.correct) {
          this.correctAnswer = idx
        }
      })
    },
    failFetchingQuestionDetail() {
      this.$toasted.error('Something went wrong')
      this.$router.go(-1)
    },
    optionLabel(idx) {
      switch (idx) {
        case 1: return 'Option A'
        case 2: return 'Option B'
        case 3: return 'Option C'
        case 4: return 'Option D'
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    saveQuestion () {
      if (this.editMode) {
        this.editQuestion()
      }
      else {
        this.newQuestion()
      }
    },
    newQuestion () {
      let payload = { ...this.questionDetail }
      payload.options[this.correctAnswer - 1].correct = true
      this.createQuestion({
        data: {
          bankId: this.$route.params.bankId
        },
        payload: payload,
        callback: this.successCreatingQuestion,
        fail: this.failedCreatingQuestion
      })
    },
    successCreatingQuestion () {
      this.$toasted.success('Successfully created a question')
      this.$router.push({
        name: 'questionBankDetail',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    },
    failedCreatingQuestion () {
      this.$toasted.error('Something went wrong')
    },
    editQuestion () {
      this.questionDetail.options.forEach(option => {
        if (option.correct)
          delete option.correct
      })
      let payload = { ...this.questionDetail }
      payload.options[this.correctAnswer - 1].correct = true
      this.updateQuestion({
        data: {
          bankId: this.$route.params.bankId,
          questionId: this.$route.params.questionId
        },
        payload: payload,
        callback: this.successUpdatingQuestion,
        fail: this.failedUpdatingQuestion
      })
    },
    successUpdatingQuestion () {
      this.$toasted.success('Successfully updated this question')
      this.$router.push({
        name: 'questionBankQuestionDetail',
        params: {
          bankId: this.$route.params.bankId,
          questionId: this.$route.params.questionId
        }
      })
    },
    failedUpdatingQuestion () {
      this.$toasted.error('Something went wrong')
    }
  }
}
