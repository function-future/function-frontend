export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
