import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'modal-add-question',
  components: {
    BaseButton,
    BaseTextArea
  },
  props: {
    description: {
      type: String,
      default: ''
    },
    questionId: {
      type: String,
      default: ''
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      descriptionTemp: this.description,
      descriptionLabel: 'description'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submit () {
      if (this.descriptionTemp.length > 0) {
        this.$emit('submit', {
          description: this.descriptionTemp
        })
        this.close()
      } else {
        this.$toasted.error('description cannot null')
      }
    },
    updateQuestion () {
      if (this.descriptionTemp.length > 0) {
        this.$emit('update', {
          description: this.descriptionTemp
        })
        this.close()
      } else {
        this.$toasted.error('description cannot null')
      }
    }
  }
}
