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
      // descriptionQuestion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac fermentum velit. Aliquam ligula lacus, faucibus vitae auctor a, mattis vitae est. In hac habitasse platea dictumst. Ut efficitur metus.'
      descriptionQuestion: 'abcd'
    }
  },
  methods: {
    testAlert () {
      alert('click')
    }
  }
}
