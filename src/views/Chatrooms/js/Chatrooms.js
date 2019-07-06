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
      userId: '5d12a2ed32a1893cec242e73',
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
      messageBottomIntervalObject: null,
      messageReadIntervalObject: null,
      sendingNewMessage: false,
      changingChatroom: true,
      creatingChatroom: false,
      updatingChatroom: false,
      isSearching: false,
      bottomPivotMessageId: '',
      topPivotMessageId: ''
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
      'fetchChatroomWithKeyword',
      'fetchMessagesAfterPivot',
      'unshiftChatrooms',
      'pushChatrooms',
      'unshiftMessages',
      'pushMessages',
      'resetMessages',
      'resetChatrooms'
    ]),
    submitNewChatroom (data) {
      chatroomApi.createChatroom(response => {
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
        this.resetMessages()
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
          this.pushChatrooms(additionalChatrooms)
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
      if (this.changingChatroom) {
        chatroomApi.getMessages(response => {
          this.changingChatroom = false
          if (response.data.length) {
            this.unshiftMessages(response.data.reverse())
            this.topPivotMessageId = this.messages[0].id
            this.bottomPivotMessageId = this.messages[this.messages.length - 1].id
            this.resetMessageBottomPoll()
            $state.loaded()
          } else {
            this.resetMessagePoll()
            $state.complete()
          }
        }, error => console.log(error), {
          params: {
            chatroomId: this.activeChatroomId,
            page: this.messagePage
          }
        })
      } else {
        chatroomApi.getMessagesBeforePivot(response => {
          this.unshiftMessages(response.data.reverse())
          if (response.data.length) {
            this.topPivotMessageId = this.messages[0].id
            $state.loaded()
          } else {
            $state.complete()
          }
        }, err => console.log(err),
        {
          params: {
            messageId: this.topPivotMessageId,
            chatroomId: this.activeChatroomId
          }
        })
      }
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
          this.resetChatrooms()
          this.chatroomPage = 1
        } else {
          this.chatroomTitle = 'Public'
          if (this.activeChatroomId !== 'PUBLIC') {
            this.activeChatroomId = 'PUBLIC'
            this.activeChatroomType = 'PUBLIC'
          }
          this.chatroomPage = 1
          clearInterval(this.chatroomIntervalObject)
          this.resetChatrooms()
        }
      }
    },
    stopPolling () {
      clearInterval(this.chatroomIntervalObject)
      clearInterval(this.messageIntervalObject)
      clearInterval(this.messageReadIntervalObject)
      clearInterval(this.messageBottomIntervalObject)
    },
    resetChatroomPoll () {
      clearInterval(this.chatroomIntervalObject)
      this.initChatroomPoll()
    },
    resetMessagePoll () {
      clearInterval(this.messageIntervalObject)
      this.initMessagesPoll()
    },
    resetMessageBottomPoll () {
      clearInterval(this.messageBottomIntervalObject)
      this.initMessageBottomPoll()
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
            this.bottomPivotMessageId = this.messages[this.messages.length - 1].id
            this.topPivotMessageId = this.messages[0].id
            clearInterval(this.messageIntervalObject)
            this.initMessageBottomPoll()
          }
        })
      }, POLL_INTERVAL)
    },
    initMessageBottomPoll () {
      this.messageBottomIntervalObject = setInterval(() => {
        this.fetchMessagesAfterPivot({
          data: {
            params: {
              messageId: this.bottomPivotMessageId,
              chatroomId: this.activeChatroomId
            }
          },
          fail: err => console.log(err),
          cb1: () => {
            this.bottomPivotMessageId = this.messages[this.messages.length - 1].id
            this.scrollMessageToBottom()
          },
          cb2: () => {
            if (this.changingChatroom) {
              this.resetMessages()
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
      clearInterval(this.messageBottomIntervalObject)
      this.bottomPivotMessageId = ''
      this.topPivotMessageId = ''
      this.messagePage = 1
      this.resetMessages()
      this.changingChatroom = true
    },
    isSearching: function (newVal, oldVal) {
      this.chatroomPage = 1
      clearInterval(this.chatroomIntervalObject)
      this.resetMessages()
    }
  },
  mounted () {
    this.initReadMessagesPoll()
    this.messagePage = 1
    this.chatroomPage = 1
  },
  destroyed () {
    this.resetMessages()
    this.resetMessages()
    this.stopPolling()
  }
}
