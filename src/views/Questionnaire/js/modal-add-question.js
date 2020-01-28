import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import { mapActions } from 'vuex'

export default {
  name: 'modal-add-question',
  components: {
    BaseButton,
    BaseTextArea
  },
  props: {
    type: {
      type: String,
      default: ''
    },
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
    ...mapActions([
      'toast'
    ]),
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
        this.toast({
          message: 'description cannot empty',
          type: 'is-danger'
        })
      }
    },
    updateQuestion () {
      if (this.descriptionTemp.length > 0) {
        this.$emit('update', {
          description: this.descriptionTemp
        })
        this.close()
      } else {
        this.toast({
          message: 'description cannot empty',
          type: 'is-danger'
        })
      }
    }
  }
}
