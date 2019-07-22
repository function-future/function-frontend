import BaseButton from '@/components/BaseButton'

export default {
  name: 'modal-file-upload-progress',
  components: {
    BaseButton
  },
  props: [
    'isUploading',
    'list'
  ],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
