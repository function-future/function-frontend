import BaseCard from '@/components/BaseCard'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

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
    },
    isReview: {
      default: false,
      required: false
    }
  },
  data () {
    return {
      titleLabel: 'TITLE',
      descriptionLabel: 'DESCRIPTION',
      startDateTemp: new Date(),
      dueDateTemp: new Date(),
      startDateDisplay: 0,
      dueDateDisplay: 0,
      dueDateString: ''
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  methods: {
    dateToString (input) {
      return moment(input).format('DD MMM YYYY')
    }
  }
}
