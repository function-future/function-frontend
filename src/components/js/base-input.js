export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    inputType: {
      type: String
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    },
    emitKeyUp (event) {
      this.$emit('keyup', event)
    }
  }
}
