import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput.vue'

export default {
  name: 'modal-create-folder',
  components: {
    BaseButton,
    BaseInput
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    create () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.$emit('create', this.title)
    }
  }
}
