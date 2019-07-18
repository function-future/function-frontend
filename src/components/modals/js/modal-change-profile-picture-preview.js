import BaseButton from '@/components/BaseButton'

export default {
  name: 'modal-change-profile-picture-preview',
  components: {
    BaseButton
  },
  props: [
    'newAvatar'
  ],
  methods: {
    close () {
      this.$emit('close')
    },
    save () {
      this.$emit('save')
    }
  }
}
