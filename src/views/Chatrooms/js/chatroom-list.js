import ChatroomCard from '@/views/Chatrooms/ChatroomCard'
import { mapActions, mapGetters } from 'vuex'
import Breakpoint from '@/mixins/Breakpoint'
import ChatroomType from '@/mixins/ChatroomType'
import Websocket from '@/mixins/Websocket'
import config from '@/config/index'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'ChatroomList',
  mixins: [
    Breakpoint,
    ChatroomType,
    Websocket
  ],
  components: {
    ChatroomCard,
    InfiniteLoading
  },
  data () {
    return {
      search: '',
      page: 1,
      size: 10,
      totalSize: 0,
      activeChatroomId: '',
      chatroomSubscription: null
    }
  },
  computed: {
    ...mapGetters([
      'chatrooms',
      'currentUser'
    ])
  },
  watch: {
    isSocketConnected: function () {
      if (this.isSocketConnected) {
        this.chatroomSubscription = this.subscribe(
          config.api.communication.topic.chatroom(this.currentUser.id),
          this.chatroomSubscriptionCallback
        )
      }
    },
    search: function () {
      if (this.search) {
        if (this.chatroomSubscription) {
          this.chatroomSubscription.unsubscribe()
          this.chatroomSubscription = null
        }
        this.fetchChatrooms({
          data: {
            params: {
              page: this.page,
              size: this.size,
              search: this.search
            }
          },
          fail: this.onFetchChatroomsFail,
          cb: this.onFetchChatroomsSuccess
        })
      } else {
        if (!this.chatroomSubscription) {
          this.chatroomSubscription = this.subscribe(
            config.api.communication.topic.chatroom(this.currentUser.id),
            this.chatroomSubscriptionCallback
          )
        }
      }
    }
  },
  created () {
    this.fetchChatrooms({
      data: {
        params: {
          page: this.page,
          size: this.size,
          search: this.search
        }
      },
      fail: this.onFetchChatroomsFail,
      cb: this.onFetchChatroomsSuccess
    })
    this.setChatroomsLimit({
      data: {
        body: {
          limit: this.page * this.size
        }
      },
      fail: this.onError
    })
  },
  destroyed () {
    this.chatroomSubscription.unsubscribe()
  },
  methods: {
    ...mapActions([
      'fetchChatrooms',
      'resetChatrooms',
      'pushChatrooms',
      'setChatroomsLimit'
    ]),
    infiniteChatroomHandler ($state) {

    },
    onClickAdd () {
      this.$emit('clickAdd')
    },
    onFetchChatroomsFail () {
      this.toast({
        data: {
          message: 'Fail to fetch chatrooms',
          type: 'is-danger'
        }
      })
    },
    onError (err) {
      console.error(err)
      this.toast({
        data: {
          message: 'Fail to connect to server',
          type: 'is-danger'
        }
      })
    },
    onFetchChatroomsSuccess (data) {
      this.totalSize = data.paging.totalRecords
      this.updateChatrooms(data.data)
    },
    getChatroomName (chatroom) {
      if (chatroom.type === this.chatroomType.GROUP) {
        return chatroom.name
      } else {
        for (const participant of chatroom.participants) {
          if (participant.id !== this.currentUser.id) {
            return participant.name
          }
        }
      }
    },
    updateChatrooms (data) {
      console.log(data)
      this.resetChatrooms()
      this.pushChatrooms(data)
    },
    chatroomSubscriptionCallback (data) {
      this.totalSize = data.paging.totalRecords
      this.updateChatrooms(JSON.parse(data.body).data)
    }
  }
}
