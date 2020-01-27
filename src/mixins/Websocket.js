import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  data () {
    return {
      stompClient: null,
      isSocketConnected: false
    }
  },
  created () {
    this.initWebsocketConnection()
  },
  destroyed () {
    if (this.stompClient !== null) {
      this.stompClient.disconnect()
    }
  },
  methods: {
    initWebsocketConnection () {
      let socket = new SockJS('/ws')
      this.stompClient = Stomp.over(socket)
      this.stompClient.debug = null
      this.stompClient.connect({}, this.connectSuccessCallback, this.connectErrorCallback)
    },
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
