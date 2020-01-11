import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuizModal',
  props: [
    'trialsLeft',
    'result'
  ],
  components: {
    BaseButton
  },
  computed: {
    source () {
      return require('@/assets/images/illustrations/finish-quiz.svg')
    }
  },
  methods: {
    retry () {
      this.$emit('retry')
    },
    finish () {
      this.$emit('finish')
    }
  }
}
