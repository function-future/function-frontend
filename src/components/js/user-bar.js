export default {
  name: 'UserBar',
  data () {
    return {
      isExtend: ''
    }
  },
  methods: {
    extendUserBar: function () {
      this.isExtend = true
    },
    shrinkUserBar: function () {
      this.isExtend = false
    }
  }
}
