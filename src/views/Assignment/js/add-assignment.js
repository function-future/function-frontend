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
        batchCode: '',
        // file: ''
      },
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
      let payload = { ...this.assignment }
      payload.deadline = new Date(payload.deadline).getTime()
      payload.batchCode = this.$route.params.batchCode
      this.createAssignment({
        payload,
        data: {
          batchCode: this.$route.params.batchCode
        },
        callback: this.successCreateAssignment,
        fail: this.failCreatingAssignment
      })
    }
  }
}
