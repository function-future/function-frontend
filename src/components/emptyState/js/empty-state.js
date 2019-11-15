export default {
  name: 'emptyState',
  props: {
    src: {
      default: 'default',
      type: String
    }
  },
  computed: {
    source () {
      return require('@/assets/images/illustrations/' + this.src + '.svg')
    }
  }
}
