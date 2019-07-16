import BaseCard from '@/components/BaseCard'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import Datepicker from 'vuejs-datepicker'
import { mapGetters, mapMutations } from 'vuex'

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
      descriptionLabel: 'DESCRIPTION',
      // value: {
      //   type: Object
      // }
    }
  },
  computed: {
    ...mapGetters([
      'currentQuestionnaireAdmin'
    ])
  },
  methods: {
    ...mapMutations([
      'RESET_CURRENT_QUESTIONNAIRE_ADMIN'
    ])
  },
  // created () {
  //   // console.log(value12)
  // },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  mounted () {
    Object.assign(this.value, this.currentQuestionnaireAdmin)
    // console.log('A'. this.value)
    // this.startIDate = new Date(this.value.startDate)
    // this.dueDate = new Date(this.value.dueDate)
  },
  destroyed () {
    this.RESET_CURRENT_QUESTIONNAIRE_ADMIN
  }
}
