import BaseCard from '@/components/BaseCard'

export default {
  name: 'QuestionCard',
  components: {
    BaseCard
  },
  props: {
    number: Number,
    description: String
  },
  data () {
    return {
      numberQuestion: 2,
      // descriptionQuestion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac fermentum velit. Aliquam ligula lacus, faucibus vitae auctor a, mattis vitae est. In hac habitasse platea dictumst. Ut efficitur metus.'
      descriptionQuestion: 'abcd'
    }
  }
}
