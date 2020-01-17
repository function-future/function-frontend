export default {
  data () {
    return {
      isMobile: window.innerWidth < 1023
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.isMobile = window.innerWidth < 1023
    }
  }
}
