export default {
  name: 'emptyState',
  props: {
    src: {
      default: 'default',
      type: String
    },
    errorState: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    source () {
      return require('@/assets/images/illustrations/' + this.src + '.svg')
    }
  }
}
