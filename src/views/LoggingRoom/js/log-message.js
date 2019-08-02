import moment from 'moment'

export default {
  name: 'log-message',
  props: {
    avatar: String,
    name: String,
    message: String,
    clock: Number
  },
  methods: {
    convertClock () {
      return moment(this.clock).format('HH:mm')
    }
  }
}
