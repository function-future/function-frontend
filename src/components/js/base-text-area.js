export default {
  name: 'BaseTextArea',
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
