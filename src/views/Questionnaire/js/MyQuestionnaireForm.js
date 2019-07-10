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
      default: '0',
      type: String
    },
    questionDescription: {
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."\n',
      type: String
    }
  },
  data () {
    return {
      score: 0,
      comment: '',
      noQuestion: 1,
      questionDescription: 'Lorem Ipsum'
    }
  }
}
