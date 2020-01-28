export default {
  name: 'menu-card',
  props: {
    iconMenu: {
      type: String,
      default: 'plus'
    },
    iconTitle: {
      type: String,
      default: 'Title'
    }
  },
  methods: {
    testclick () {
      window.alert('hai')
      console.log('broken')
      this.iconTitle = 'skipskip'
      this.$emit('click')
    }
  }
}
