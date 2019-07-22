import BaseCard from '@/components/BaseCard'
import BaseSelect from '@/components/BaseSelect'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'MyQuestionnaireForm',
  components: {
    BaseCard,
    BaseTextArea,
    BaseSelect
  },
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
      console.log('A', this.score)
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
