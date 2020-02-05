import Breakpoint from '@/mixins/Breakpoint'
import ChatroomType from '@/mixins/ChatroomType'
import Websocket from '@/mixins/Websocket'
import CustomMobileNavBar from '@/components/skeletons/CustomMobileNavBar'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
import MessageBubbleReceived from '@/views/Chatrooms/MessageBubbleReceived'
import MessageBubbleSent from '@/views/Chatrooms/MessageBubbleSent'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import config from '@/config/index'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'ChatroomContent',
  mixins: [
    Breakpoint,
    ChatroomType,
    Websocket
  ],
  components: {
    CustomMobileNavBar,
    InfiniteLoading,
    MessageBubbleReceived,
    MessageBubbleSent,
    ModalChatroom,
    ListItem
  },
  props: {
    chatroomId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      chatroom: {},
      inputMessage: '',
      messagesSubscription: null,
      lastMessageId: null,
      size: 10,
      showUpdateModal: false,
      isLoading: true
    }
  },
  created () {
    this.hideBottomNavBar()
    if (this.chatroomId !== 'public') {
      this.fetchDetailChatroom({
        data: {
          params: {
            chatroomId: this.chatroomId
          }
        },
        fail: this.onFetchDetailError,
        cb: this.onFetchDetailSuccess
      })
    }
    this.enterChatroom({
      data: {
        params: {
          chatroomId: this.chatroomId
        }
      },
      fail: this.onError
    })
    this.refreshMessages()
  },
  destroyed () {
    this.showBottomNavBar()
    this.leaveChatroom({
      data: {
        params: {
          chatroomId: this.chatroomId
        }
      },
      fail: this.onError
    })
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'messages'
    ]),
    chatroomName () {
      if (this.chatroomId === 'public') {
        return 'Public'
      } else if (this.chatroom.type === this.chatroomType.GROUP) {
        return this.chatroom.name ? this.chatroom.name : ''
      } else if (this.chatroom.members) {
        for (const participant of this.chatroom.members) {
          if (participant.id !== this.currentUser.id) {
            return participant.name
          }
        }
      }
    },
    computedMessagesDate () {
      let dateSeparator = null
      this.messages.forEach(message => {
        if (!dateSeparator) {
          message.isNewDate = true
        } else if (moment(this.toDateList(message.time)).diff(this.toDateList(dateSeparator), 'days') >= 1) {
          message.isNewDate = true
        } else {
          message.isNewDate = false
        }
        dateSeparator = message.time
      })
      return this.messages
    }
  },
  methods: {
    ...mapActions([
      'fetchDetailChatroom',
      'leaveChatroom',
      'enterChatroom',
      'resetMessages',
      'pushMessages',
      'unshiftMessages',
      'fetchMessages',
      'fetchMessagesBeforePivot',
      'createMessage',
      'updateChatroom',
      'toast',
      'hideBottomNavBar',
      'showBottomNavBar'
    ]),
    infiniteMessageHandler ($state) {
      if (this.lastMessageId === null) {
        this.fetchMessages({
          data: {
            params: {
              page: 1,
              size: this.size,
              chatroomId: this.chatroomId
            }
          },
          fail: this.onError,
          cb: this.onFetchMessagesSuccess($state)
        })
      } else {
        this.fetchMessagesBeforePivot({
          data: {
            params: {
              messageId: this.lastMessageId,
              chatroomId: this.chatroomId
            }
          },
          fail: this.onError,
          cb: this.onFetchMessagesSuccess($state)
        })
      }
    },
    onFetchDetailError (e) {
      console.error(e)
      this.toast({
        data: {
          message: 'Fail to fetch chatroom detail',
          type: 'is-danger'
        }
      })
    },
    onFetchDetailSuccess (response) {
      this.chatroom = response.data
    },
    onFetchMessagesSuccess ($state) {
      return (response) => {
        if (response.data.length) {
          response.data.reverse()
          this.lastMessageId = response.data[0].id
          this.unshiftMessages(response.data)
          $state.loaded()
        } else {
          this.lastMessageId = this.lastMessageId === null ? '' : this.lastMessageId
          $state.complete()
        }
      }
    },
    onError (e) {
      console.error(e)
      this.toast({
        data: {
          message: 'Fail to connect to server',
          type: 'is-danger'
        }
      })
    },
    onSendMessageError (e) {
      console.error(e)
      this.toast({
        data: {
          message: 'Fail to send message',
          type: 'is-danger'
        }
      })
    },
    onKeyup (e) {
      if (e.keyCode === 13) {
        this.sendMessage()
      }
    },
    onSubmitUpdateChatroom (data) {
      this.updateChatroom({
        data: {
          params: {
            chatroomId: this.chatroomId
          },
          body: data
        },
        fail: this.onError,
        cb: this.onSuccessUpdateChatroom
      })
    },
    onSuccessUpdateChatroom () {
      this.toast({
        data: {
          message: 'Update chatroom success',
          type: 'is-success'
        }
      })
      this.fetchDetailChatroom({
        data: {
          params: {
            chatroomId: this.chatroomId
          }
        },
        fail: this.onFetchDetailError,
        cb: this.onFetchDetailSuccess
      })
    },
    sendMessage () {
      if (this.inputMessage) {
        this.createMessage({
          data: {
            params: {
              chatroomId: this.chatroomId
            },
            body: {
              message: this.inputMessage
            }
          },
          fail: this.onSendMessageError
        })
        this.inputMessage = ''
      }
    },
    toDateList (time) {
      return [moment(time).year(), moment(time).month(), moment(time).date()]
    },
    printDateSeparator (message) {
      let diffDayWithNow = moment(this.toDateList(Date.now()))
        .diff(this.toDateList(message.time), 'days')
      if (diffDayWithNow < 1) {
        return 'Today'
      } else if (diffDayWithNow < 2) {
        return 'Yesterday'
      } else {
        return moment(message.time).format('DD MMM YY')
      }
    },
    refreshMessages () {
      this.lastMessageId = null
      if (this.messagesSubscription) {
        this.messagesSubscription.unsubscribe()
      }
      this.resetMessages()
      this.subscribeMessages()
    },
    subscribeMessages () {
      if (this.isSocketConnected) {
        this.isLoading = false
        this.messagesSubscription = this.subscribe(
          config.api.communication.topic.chat(this.chatroomId),
          this.messagesSubscriptionCallback
        )
      }
    },
    messagesSubscriptionCallback (data) {
      let parsedData = JSON.parse(data.body)
      this.pushMessages([parsedData])
      this.scrollMessageToBottom()
    },
    scrollMessageToBottom () {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#messages-container')
        container.scrollTop = container.scrollHeight
      })
    },
    showModal () {
      this.showUpdateModal = true
    }
  },
  watch: {
    chatroomId (newChatroomId, oldChatroomId) {
      this.isLoading = true
      if (newChatroomId !== 'public') {
        this.fetchDetailChatroom({
          data: {
            params: {
              chatroomId: newChatroomId
            }
          },
          fail: this.onFetchDetailError,
          cb: this.onFetchDetailSuccess
        })
      }
      this.leaveChatroom({
        data: {
          params: {
            chatroomId: oldChatroomId
          }
        },
        fail: this.onError
      })
      this.enterChatroom({
        data: {
          params: {
            chatroomId: newChatroomId
          }
        },
        fail: this.onError
      })
      this.refreshMessages()
    },
    isSocketConnected: function () {
      this.subscribeMessages()
    }
  }
}
