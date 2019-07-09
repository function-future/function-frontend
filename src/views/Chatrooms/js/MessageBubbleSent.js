import moment from 'moment'

export default {
  name: 'MessageBubbleSent',
  props: {
    message: String,
    clock: Number
  },
  methods: {
    convertClock () {
      return moment(this.clock).format('HH:mm')
    }
  }
}
