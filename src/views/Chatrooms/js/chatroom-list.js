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
      totalSize: null,
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
        this.page = 1
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
    this.unsetChatroomsLimit({ fail: this.onError })
  },
  methods: {
    ...mapActions([
      'fetchChatrooms',
      'resetChatrooms',
      'pushChatrooms',
      'setChatroomsLimit',
      'unsetChatroomsLimit'
    ]),
    infiniteChatroomHandler ($state) {
      if (this.totalSize === null) {
        this.fetchChatrooms({
          data: {
            params: {
              page: this.page,
              size: this.size,
              search: this.search
            }
          },
          fail: this.onFetchChatroomsFail,
          cb: this.onFetchInitialChatroomsSuccess($state)
        })
      } else if (this.totalSize <= this.page * this.size) {
        $state.complete()
      } else {
        console.log(this.page)
        this.page++
        this.setChatroomsLimit({
          data: {
            body: {
              limit: this.page * this.size
            }
          },
          fail: this.onError,
          cb: this.onSetChatroomLimitSuccess($state)
        })
      }
    },
    onSetChatroomLimitSuccess ($state) {
      return () => {
        $state.loaded()
      }
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
    onFetchInitialChatroomsSuccess ($state) {
      return (data) => {
        this.onFetchChatroomsSuccess(data)
        this.totalSize = data.paging.totalRecords
        $state.loaded()
      }
    },
    onFetchChatroomsSuccess (data) {
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
      let parsedData = JSON.parse(data.body)
      console.log(parsedData)
      this.totalSize = parsedData.paging.totalRecords
      this.updateChatrooms(parsedData.data)
    }
  }
}
