import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuizModal',
  components: {
    BaseButton
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
