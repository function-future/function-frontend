import BaseInput from '@/components/BaseInput'
export default {
  name: 'SearchBar',
  components: {
    BaseInput
  },
  props: {
    searchClass: {
      type: String
    }
  },
  methods: {
    emitValue (value) {
      this.$emit('input', value)
    }
  }
}
