import BaseButton from '@/components/BaseButton'

export default {
  name: 'modal-profile-picture-preview',
  props: ['newImage'],
  components: {
    BaseButton
  },
  methods: {
    close () {
      this.$emit('close')
    },
    save () {
      this.$emit('save')
    }
  }
}
