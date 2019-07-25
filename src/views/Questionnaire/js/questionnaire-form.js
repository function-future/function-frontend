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
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      titleLabel: 'TITLE',
      descriptionLabel: 'DESCRIPTION',
      startDateTemp: new Date(),
      dueDateTemp: new Date(),
      startDateDisplay: 0,
      dueDateDisplay: 0
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  }
}
