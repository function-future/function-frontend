import BaseButton from '@/components/BaseButton'

export default {
  name: 'modal-delete-confirmation',
  components: {
    BaseButton
  },
  methods: {
    close () {
      this.$emit('close')
    },
    clickDelete () {
      this.$emit('clickDelete')
    }
  }
}
