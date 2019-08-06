import BaseCard from '@/components/BaseCard'

export default {
  name: 'QuestionCard',
  components: {
    BaseCard
  },
  props: {
    number: Number,
    description: String,
    score: Number,
    isResult: Boolean,
    isEdit: Boolean
  },
  data () {
    return {
      numberQuestion: 2,
      descriptionQuestion: 'abcd'
    }
  }
}
