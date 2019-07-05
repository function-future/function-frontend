import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import ChatroomCard from '../ChatroomCard'
import BaseInput from '@/components/BaseInput'
import MessageBubbleReceived from '../MessageBubbleReceived'
import MessageBubbleSent from '../MessageBubbleSent'
import ModalChatroom from '../ModalChatroom'
import chatroomApi from '@/api/controller/chatrooms'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import moment from 'moment'

const POLL_INTERVAL = 1000

export default {
  name: 'Chatrooms',
  components: {
    MessageBubbleSent,
    MessageBubbleReceived,
    BaseInput,
    BaseCard,
    SearchBar,
    ChatroomCard,
    InfiniteLoading,
    ModalChatroom
  },
  data () {
    return {
      // TODO: change userId to authenticated user
      userId: '5d119940047e5e37a8986220',
      searchText: '',
      typeChoosen: 'PUBLIC',
      messageText: '',
      activeChatroomId: 'PUBLIC',
      activeChatroomType: 'PUBLIC',
      chatroomPage: 1,
      messagePage: 1,
      chatroomTitle: 'Public',
      chatroomIntervalObject: null,
      messageIntervalObject: null,
      messageReadIntervalObject: null,
      sendingNewMessage: false,
      changingChatroom: false,
      creatingChatroom: false,
      updatingChatroom: false,
      isSearching: false
    }
  },
  computed: {
    ...mapGetters([
      'chatrooms',
      'messages'
    ]),
    privateChatrooms () {
      return this.chatrooms.filter(chatroom => {
        return chatroom.type === 'PRIVATE'
      })
    },
    groupChatrooms () {
      return this.chatrooms.filter(chatroom => {
        return chatroom.type === 'GROUP'
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchChatrooms',
      'fetchMessages',
      'updateSeenStatus',
      'fetchChatroomWithKeyword'
    ]),
    ...mapMutations([
      'RESET_MESSAGES',
      'RESET_CHATROOMS',
      'UNSHIFT_CHATROOMS',
      'PUSH_CHATROOMS',
      'UNSHIFT_MESSAGES'
    ]),
    submitNewChatroom (data) {
      chatroomApi.createChatroom(response => {
        console.log(response)
        this.activeChatroomId = response.data.id
        this.activeChatroomType = response.data.type
        if (response.data.type === 'PRIVATE') {
          this.changeTypeChoosen('PRIVATE')
          this.chatroomTitle = this.getAvatarAndName(response.data.members).name
        } else {
          this.changeTypeChoosen('GROUP')
          this.chatroomTitle = response.data.name
        }
      }, err => console.log(err), {
        body: data
      })
    },
    updateChatroom (data) {
      chatroomApi.updateChatroom(response => {
        this.selectChatroom(response.data)
        this.chatroomPage = 1
        this.RESET_CHATROOMS()
        this.activeChatroomId = response.data.id
        this.activeChatroomType = response.data.type
        this.$nextTick(() => {
          this.$refs.chatroomInfiniteLoading.stateChanger.reset()
        })
      }, err => console.log(err), {
        params: {
          chatroomId: this.activeChatroomId
        },
        body: data
      })
    },
    openCreateChatroomModal () {
      this.creatingChatroom = true
    },
    toDateList (time) {
      return [moment(time).year(), moment(time).month(), moment(time).date()]
    },
    computeMessagesDate (messages) {
      let dateSeparator = null
      messages.forEach(message => {
        if (!dateSeparator) {
          message.isNewDate = true
        } else if (moment(this.toDateList(message.time)).diff(this.toDateList(dateSeparator), 'days') >= 1) {
          message.isNewDate = true
        } else {
          message.isNewDate = false
        }
        dateSeparator = message.time
      })
      return messages
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
    selectChatroom (chatroom) {
      this.activeChatroomId = chatroom.id
      this.activeChatroomType = chatroom.type
      if (chatroom.type === 'PUBLIC') {
        this.chatroomTitle = 'Public'
      } else if (chatroom.type === 'GROUP') {
        this.chatroomTitle = chatroom.name
      } else {
        this.chatroomTitle = this.getAvatarAndName(chatroom.participants).name
      }
    },
    infiniteChatroomHandler ($state) {
      chatroomApi.getChatrooms(response => {
        let additionalChatrooms = []
        for (const chatroom of response.data) {
          let exists = false
          for (const existingChatroom of this.chatrooms) {
            if (existingChatroom.id === chatroom.id) {
              exists = true
              break
            }
          }
          if (!exists) {
            additionalChatrooms.push(chatroom)
          }
        }
        if (additionalChatrooms.length) {
          this.PUSH_CHATROOMS(additionalChatrooms)
          if (this.chatroomPage === 1) {
            this.resetChatroomPoll()
          }
          this.chatroomPage += 1
          $state.loaded()
        } else {
          if (this.chatroomPage === 1) {
            this.resetChatroomPoll()
          }
          $state.complete()
        }
      }, error => console.log(error), {
        params: {
          page: this.chatroomPage,
          type: this.typeChoosen,
          search: ''
        }
      })
    },
    infiniteMessageHandler ($state) {
      chatroomApi.getMessages(response => {
        this.changingChatroom = false
        let additionalMessages = []
        for (const message of response.data.reverse()) {
          let exists = false
          for (const existingMessage of this.messages) {
            if (existingMessage.id === message.id) {
              exists = true
              break
            }
          }
          if (!exists) {
            additionalMessages.push(message)
          }
        }
        if (additionalMessages.length) {
          this.UNSHIFT_MESSAGES(additionalMessages)
          if (this.messagePage === 1) {
            this.resetMessagePoll()
          }
          this.messagePage += 1
          $state.loaded()
        } else {
          if (this.messagePage === 1) {
            this.resetMessagePoll()
          }
          $state.complete()
        }
      }, error => console.log(error), {
        params: {
          chatroomId: this.activeChatroomId,
          page: this.messagePage
        }
      })
    },
    submitMessage (event) {
      if (event.keyCode === 13 && this.messageText) {
        chatroomApi.createMessage(response => {
          this.messageText = ''
          this.sendingNewMessage = true
        }, error => {
          console.log(error)
          this.messageText = ''
          this.$toasted.error('Fail to send message')
        },
        {
          params: {
            chatroomId: this.activeChatroomId
          },
          body: {
            message: this.messageText
          }
        })
      }
    },
    scrollMessageToBottom () {
      this.$nextTick(() => {
        if (this.sendingNewMessage) {
          let container = this.$el.querySelector('#messages-container')
          container.scrollTop = container.scrollHeight
          this.sendingNewMessage = false
        }
      })
    },
    getAvatarAndName (participants) {
      for (const participant of participants) {
        if (participant.id !== this.userId) {
          return {
            avatar: participant.avatar,
            name: participant.name
          }
        }
      }
    },
    changeSearchText (value) {
      this.searchText = value
      if (value.length > 0) {
        this.isSearching = true
        this.fetchChatroomWithKeyword({
          data: {
            params: {
              page: 1,
              search: this.searchText
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      } else {
        this.isSearching = false
      }
    },
    changeTypeChoosen (type) {
      if (type !== this.typeChoosen) {
        this.typeChoosen = type
        if (type !== 'PUBLIC') {
          this.RESET_CHATROOMS()
          this.chatroomPage = 1
        } else {
          this.chatroomTitle = 'Public'
          if (this.activeChatroomId !== 'PUBLIC') {
            this.activeChatroomId = 'PUBLIC'
            this.activeChatroomType = 'PUBLIC'
          }
          this.chatroomPage = 1
          clearInterval(this.chatroomIntervalObject)
          this.RESET_CHATROOMS()
        }
      }
    },
    stopPolling () {
      clearInterval(this.chatroomIntervalObject)
      clearInterval(this.messageIntervalObject)
      clearInterval(this.messageReadIntervalObject)
    },
    resetChatroomPoll () {
      clearInterval(this.chatroomIntervalObject)
      this.initChatroomPoll()
    },
    resetMessagePoll () {
      clearInterval(this.messageIntervalObject)
      this.initMessagesPoll()
    },
    initChatroomPoll () {
      this.chatroomIntervalObject = setInterval(() => {
        this.fetchChatrooms({
          data: {
            params: {
              page: 1,
              type: this.typeChoosen,
              search: this.searchText
            }
          },
          fail: (err) => {
            console.log(err)
          },
          cb: () => {
            this.chatroomPage = 1
            this.$nextTick(() => {
              this.$refs.chatroomInfiniteLoading.stateChanger.reset()
            })
          }
        })
      }, POLL_INTERVAL)
    },
    initMessagesPoll () {
      this.messageIntervalObject = setInterval(() => {
        this.fetchMessages({
          data: {
            params: {
              chatroomId: this.activeChatroomId,
              page: 1
            }
          },
          fail: err => console.log(err),
          cb: () => {
            this.scrollMessageToBottom()
            if (this.changingChatroom) {
              this.RESET_MESSAGES()
            }
          }
        })
      }, POLL_INTERVAL)
    },
    initReadMessagesPoll () {
      this.messageReadIntervalObject = setInterval(() => {
        if (this.messages.length > 0) {
          chatroomApi.updateSeenStatus(response => {
          }, err => console.log(err), {
            params: {
              chatroomId: this.activeChatroomId,
              messageId: this.messages[this.messages.length - 1].id
            }
          })
        }
      }, POLL_INTERVAL)
    }
  },
  watch: {
    activeChatroomId: function (newId, oldId) {
      clearInterval(this.messageIntervalObject)
      this.messagePage = 1
      this.RESET_MESSAGES()
      this.changingChatroom = true
    },
    isSearching: function (newVal, oldVal) {
      this.chatroomPage = 1
      clearInterval(this.chatroomIntervalObject)
      this.RESET_CHATROOMS()
    }
  },
  mounted () {
    this.initReadMessagesPoll()
    this.messagePage = 1
    this.chatroomPage = 1
  },
  destroyed () {
    this.RESET_MESSAGES()
    this.RESET_CHATROOMS()
    this.stopPolling()
  }
}
