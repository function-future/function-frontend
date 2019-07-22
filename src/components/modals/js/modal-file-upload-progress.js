import BaseButton from '@/components/BaseButton'

export default {
  name: 'modal-file-upload-progress',
  components: {
    BaseButton
  },
  props: [
    'isUploading'
  ],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
