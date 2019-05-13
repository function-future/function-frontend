import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import BaseSelect from '@/components/BaseSelect'
import Vue from 'vue'
import VCalendar from 'v-calendar'

Vue.use(VCalendar)

export default {
  name: 'AddAssignment',
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton,
    BaseSelect
  },
  data () {
    return {
      assignment: {
        title: '',
        question: '',
        date: new Date(),
        batch: 'Batch 3'
        // file: ''
      },
      batches: [
        'Batch One',
        'Batch Second',
        'Batch 3']
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    saveAssignment () {
      // console.log(this.assignment)
    }
  }
}
