import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import BaseSelect from '@/components/BaseSelect'
import { mapActions } from 'vuex'

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
    ...mapActions([
      'createAssignment'
    ]),
    cancel () {
      this.$router.go(-1)
    },
    successCreateAssignment () {
      this.$router.push({name: 'assignments'})
      this.$toasted.success('Successfully created new assignment')
    },
    failCreatingAssignment () {
      this.$toasted.error('Something went wrong')
    },
    saveAssignment () {
      this.createAssignment({
        payload: {...this.assignment},
        data: {
          batchCode: 'futur3'
        },
        callback: this.successCreateAssignment,
        fail: this.failCreatingAssignment
      })
    }
  }
}
