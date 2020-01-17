import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import config from '@/config/index'
export default {
  data () {
    return {
      stompClient: null,
      isSocketConnected: false
    }
  },
  created () {
    let socket = new SockJS(config.dev.socketHost)
    this.stompClient = Stomp.over(socket)
    this.stompClient.debug = null
    this.stompClient.connect({}, this.connectSuccessCallback, this.connectErrorCallback)
  },
  destroyed () {
    this.stompClient.disconnect()
  },
  methods: {
    connectSuccessCallback () {
      this.isSocketConnected = true
    },
    connectErrorCallback (error) {
      console.error(error)
      this.isSocketConnected = false
    },
    subscribe (topic, cb) {
      return this.stompClient.subscribe(topic, function (data) {
        cb(data)
      })
    }
  }
}
