import BaseButton from '@/components/BaseButton'


export default {
  name: 'modal',
  components: {
    BaseButton
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
