import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import BaseSelect from '@/components/BaseSelect'
import Vue from 'vue'
import VCalendar from 'v-calendar'
import { mapActions } from 'vuex'

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
        description: '',
        deadline: new Date(),
        batch: 'Batch 3',
        // file: ''
      },
      batches: [
        'Batch One',
        'Batch Second',
        'Batch 3']
    }
  },
  methods: {
    ...mapActions([
      'createAssignment'
    ]),
    cancel () {
      this.$router.go(-1)
    },
    saveAssignment () {
      this.createAssignment({
        payload: {...this.assignment},
        data: {
          batchCode: 'futur3',
          page: 0,
          pageSize: 10
        },
        callback: () => {
          this.$router.push({name: 'assignments'})
          this.$toasted.success('Successfully created new assignment')
        },
        fail: () => {
          this.$toasted.error('Fail to create new assignment')
        }
      })
    }
  }
}
