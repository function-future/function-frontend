export default {
  name: 'MyQuestionnaireForm',
  props: {
    noQuestion: {
      type: Number
    },
    question: {
      default: '',
      type: Object
    }
  },
  data () {
    return {
      questionTemp: this.question,
      score: 0,
      comment: ''
    }
  },
  watch: {
    score () {
      this.questionTemp.score = this.score
      this.questionTemp.comment = this.comment
      this.$emit('input', this.questionTemp)
    },
    comment () {
      this.questionTemp.score = this.score
      this.questionTemp.comment = this.comment
      this.$emit('input', this.questionTemp)
    }
  }
}
