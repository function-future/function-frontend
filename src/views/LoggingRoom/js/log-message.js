import moment from 'moment'

export default {
  name: 'log-message',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    clock: {
      type: Number,
      default: 0
    }
  },
  methods: {
    convertClock () {
      return moment(this.clock).format('HH:mm')
    }
  }
}
