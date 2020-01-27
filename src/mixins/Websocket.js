import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default {
  data () {
    return {
      stompClient: null,
      isSocketConnected: false,
      isDestroyed: false
    }
  },
  created () {
    this.initWebsocketConnection()
  },
  destroyed () {
    this.isDestroyed = true
    if (this.stompClient !== null && this.stompClient.connected) {
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
      if (this.isDestroyed) {
        this.stompClient.disconnect()
      } else {
        this.isSocketConnected = true
      }
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
