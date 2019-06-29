<template>
  <div class="chatroom-outer">
    <BaseCard class="chatroom-card">
      <div class="chatroom-container">
        <div class="chatroom-left">
          <div class="chatroom-left-container">
            <SearchBar @input="changeText"/>
            <div @click="changeTypeChoosen('PUBLIC')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PUBLIC'}">
              <h3>Public Chatroom</h3>
            </div>
            <div @click="changeTypeChoosen('GROUP')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'GROUP'}">
              <h3>Group Chatroom</h3>
            </div>
            <div id="group-chatroom-container" v-if="typeChoosen === 'GROUP'" class="chatroom-card-wrapper">
              <infinite-loading :identifier="typeChoosen" @infinite="infiniteChatroomHandler">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
              <ChatroomCard v-for="chatroom in chatrooms"
                            :type="chatroom.type"
                            :name="chatroom.name"
                            :is-choosen="chatroom.id === activeChatroomId"
                            :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                            :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                            :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                            :key="chatroom.id"
                            @click="selectChatroom(chatroom)" />
            </div>
            <div @click="changeTypeChoosen('PRIVATE')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PRIVATE'}">
              <h3>Private Chatroom</h3>
            </div>
            <div id="private-chatroom-container" v-if="typeChoosen === 'PRIVATE'" class="chatroom-card-wrapper">
              <infinite-loading :identifier="typeChoosen" @infinite="infiniteChatroomHandler">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
              <ChatroomCard v-for="chatroom in chatrooms"
                            :avatar="getAvatarAndName(chatroom.participants).avatar"
                            :type="chatroom.type"
                            :is-choosen="chatroom.id === activeChatroomId"
                            :name="getAvatarAndName(chatroom.participants).name"
                            :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                            :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                            :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                            @click="selectChatroom(chatroom)"
                            :key="chatroom.id" />

            </div>
          </div>
          <div class="chatroom-button-add-container">
            <font-awesome-icon icon="plus" class="chatroom-button-add"/>
          </div>
        </div>
        <div class="chatroom-separator"></div>
        <div class="chatroom-right">
          <div class="chatroom-title"><h2>{{ chatroomTitle }}</h2></div>
          <div id="messages-container" class="chatroom-messages">
            <infinite-loading :identifier="activeChatroomId" direction="top" @infinite="infiniteMessageHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
            <div v-for="message in messages" :key="message.id">
              <MessageBubbleSent v-if="message.sender.id === userId"
                                 :message="message.text"
                                 :clock="message.time"
                                 class="chatroom-message-bubble" />

              <MessageBubbleReceived v-else
                                     :message="message.text"
                                     :clock="message.time"
                                     :name="message.sender.name"
                                     :avatar="message.sender.avatar"
                                     class="chatroom-message-bubble" />
            </div>
          </div>
          <BaseInput v-model="messageText" @keyup="submitMessage" placeholder="Type a message" class="chatroom-message-box" inputType="message-box"/>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import ChatroomCard from './ChatroomCard'
import BaseInput from '@/components/BaseInput'
import MessageBubbleReceived from './MessageBubbleReceived'
import MessageBubbleSent from './MessageBubbleSent'
import chatroomApi from '@/api/controller/chatrooms'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
    InfiniteLoading
  },
  data () {
    return {
      // TODO: change userId to authenticated user
      userId: '5d12a2ed32a1893cec242e73',
      searchText: '',
      typeChoosen: 'PUBLIC',
      messageText: '',
      activeChatroomId: 'PUBLIC',
      chatroomPage: 1,
      messagePage: 1,
      chatroomTitle: 'Public',
      chatroomIntervalObject: null,
      messageIntervalObject: null,
      messageReadIntervalObject: null,
      sendingNewMessage: false,
      changingChatroom: false
    }
  },
  computed: {
    ...mapGetters([
      'chatrooms',
      'messages'
    ])
  },
  methods: {
    ...mapActions([
      'fetchChatrooms',
      'fetchMessages',
      'updateSeenStatus'
    ]),
    ...mapMutations([
      'RESET_MESSAGES',
      'RESET_CHATROOMS',
      'UNSHIFT_CHATROOMS',
      'UNSHIFT_MESSAGES'
    ]),
    selectChatroom (chatroom) {
      this.activeChatroomId = chatroom.id
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
          console.log('MASUK SINI')
          console.log(this.chatrooms[this.chatrooms.length - 1])
          if (this.chatrooms[this.chatrooms.length - 1] && this.chatrooms[this.chatrooms.length - 1].id === chatroom.id) {
            continue
          }
          additionalChatrooms.push(chatroom)
        }
        console.log('RESPONSE ADDITIONAL CHATROOM')
        console.log(additionalChatrooms)
        if (additionalChatrooms.length) {
          this.UNSHIFT_CHATROOMS(additionalChatrooms)
          if (this.chatroomPage === 1) {
            console.log('MASOOK')
            this.resetChatroomPoll()
          }
          this.chatroomPage += 1
          $state.loaded()
        } else {
          if (this.chatroomPage === 1) {
            console.log('MASOOK')
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
        let additionalMessages = []
        for (const message of response.data.reverse()) {
          if (this.messages[0] && this.messages[0].id === message.id) {
            continue
          }
          additionalMessages.push(message)
        }
        console.log('ADDITIONAL INFINITE')
        console.log(additionalMessages)
        if (additionalMessages.length) {
          this.UNSHIFT_MESSAGES(additionalMessages)
          if (this.messagePage === 1) {
            console.log('MASOOK')
            this.initMessagesPoll()
          }
          this.messagePage += 1
          $state.loaded()
        } else {
          if (this.messagePage === 1) {
            console.log('MASOOK')
            this.initMessagesPoll()
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
          console.log(response)
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
      console.log('SENDING NEW MESSAGE ' + this.sendingNewMessage)
      if (this.sendingNewMessage) {
        let container = this.$el.querySelector('#messages-container')
        container.scrollTop = container.scrollHeight
        this.sendingNewMessage = false
      }
    },
    scrollChatroomToTop () {
      if (this.typeChoosen === 'PRIVATE') {
        let container1 = this.$el.querySelector('#private-chatroom-container')
        container1.scrollTop = container1.scrollHeight
      } else if (this.typeChoosen === 'GROUP') {
        let container2 = this.$el.querySelector('#group-chatroom-container')
        container2.scrollTop = container2.scrollHeight
      }
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
    changeText (value) {
      console.log(value)
      this.text = value
    },
    changeTypeChoosen (type) {
      this.typeChoosen = type
      if (type !== 'PUBLIC') {
        clearInterval(this.messageIntervalObject)
        this.RESET_CHATROOMS()
        this.chatroomPage = 1
        // this.resetChatroomPoll()
      } else {
        if (this.activeChatroomId !== 'PUBLIC') {
          this.activeChatroomId = 'PUBLIC'
        }
        this.chatroomPage = 1
        clearInterval(this.chatroomIntervalObject)
        this.RESET_CHATROOMS()
      }
    },
    stopPolling () {
      clearInterval(this.chatroomIntervalObject)
      clearInterval(this.messageIntervalObject)
    },
    resetChatroomPoll () {
      clearInterval(this.chatroomIntervalObject)
      this.initChatroomPoll()
    },
    initChatroomPoll () {
      this.chatroomIntervalObject = setInterval(() => {
        console.log(this.typeChoosen)
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
            this.scrollChatroomToTop()
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
          fail: err => console.log(err)
        })
      }, POLL_INTERVAL)
    },
    initReadMessagesPoll () {
      this.messageReadIntervalObject = setInterval(() => {
        if (this.messages.length > 0) {
          chatroomApi.updateSeenStatus(response => {
            console.log('UPDATE SEEN STATUS')
            console.log(response)
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
      console.log('WATCHER')
      this.updateSeenStatus(this.activeChatroomId)
      clearInterval(this.messageIntervalObject)
      this.messagePage = 1
      this.RESET_MESSAGES()
      this.changingChatroom = true
    }
  },
  mounted () {
    this.initReadMessagesPoll()
    this.messagePage = 1
    this.chatroomPage = 1
  },
  updated () {
    this.scrollMessageToBottom()
    console.log('updated')
  },
  destroyed () {
    this.RESET_MESSAGES()
    this.RESET_CHATROOMS()
    this.stopPolling()
  }
}
</script>

<style scoped>

  .chatroom-card-wrapper {
    max-height: 40vh;
    overflow: auto;
    padding: 10px;
  }

  .chatroom-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .chatroom-card {
    width: 900px;
    padding: 0;
    height: 80vh;
  }

  .chatroom-container {
    display: grid;
    grid-template-columns: 33% 5px auto;
    margin-left: 0;
    height: 80vh;
  }

  .chatroom-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    cursor: pointer;
  }

  .chatroom-menu > h3, .chatroom-menu > font-awesome-icon {
    margin: 0
  }

  .chatroom-separator {
    background-color: #E7E7E7;
    height: 100%;
  }

  .chatroom-left {
    grid-column: 1;
    padding: 10px 15px 10px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chatroom-right {
    grid-column: 3;
    padding: 15px;
    height: 80vh;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .chatroom-title {
    height: 6vh;
  }

  .chatroom-title > h2 {
    margin: 1vh 0 0 0;
  }

  .chatroom-message-box {

  }

  .chatroom-messages {
    height: calc(68vh - 30px);
    margin: 10px 0;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
  }

  .chatroom-message-bubble {
    margin: 15px 0;
  }

  .chatroom-menu-blue {
    color: #02AAF3;
  }

  .chatroom-button-add {
    color: #02AAF3;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .chatroom-button-add-container {
    display: flex;
    justify-content: center;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }
</style>
