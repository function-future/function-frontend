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
  data () {
    return {
      title: 'TITLE',
      description: 'DESCRIPTION',
      date: new Date(2016, 9, 16)
    }
  }
}
