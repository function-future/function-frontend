import BaseCard from '@/components/BaseCard'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'QuestionnaireForm',
  components: {
    BaseCard,
    BaseInput,
    BaseTextArea,
    Datepicker
  },
  props: {
    // title: String,
    // desc: String,
    // startDate: Date,
    // dueDate: Date
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      titleLabel: 'TITLE',
      descriptionLabel: 'DESCRIPTION'
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  }
}
