import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput.vue'

export default {
  name: 'modal-rename-file-folder',
  components: {
    BaseButton,
    BaseInput
  },
  data () {
    return {
      title: ''
    }
  },
  props: [
    'currentTitle'
  ],
  created () {
    this.title = this.currentTitle
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
      this.$emit('submit', this.title)
    }
  }
}
