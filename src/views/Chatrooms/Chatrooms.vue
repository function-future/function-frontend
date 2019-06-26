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
            <div v-if="typeChoosen === 'GROUP'" class="chatroom-card-wrapper">
              <ChatroomCard v-for="chatroom in chatrooms"
                            :type="chatroom.type"
                            :name="chatroom.name"
                            :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                            :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                            :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                            :key="chatroom.id"
                            @click="activeChatroomId = chatroom.id" />
            </div>
            <div @click="changeTypeChoosen('PRIVATE')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PRIVATE'}">
              <h3>Private Chatroom</h3>
            </div>
            <div v-if="typeChoosen === 'PRIVATE'" class="chatroom-card-wrapper">
<!-- TODO: Change avatar to participant who are not authenticated user -->
              <ChatroomCard v-for="chatroom in chatrooms"
                            :avatar="getAvatarAndName(chatroom.participants).avatar"
                            :type="chatroom.type"
                            :name="getAvatarAndName(chatroom.participants).name"
                            :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                            :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                            :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                            @click="activeChatroomId = chatroom.id"
                            :key="chatroom.id" />

            </div>
          </div>
          <div class="chatroom-button-add-container">
            <font-awesome-icon icon="plus" class="chatroom-button-add"/>
          </div>
        </div>
        <div class="chatroom-separator"></div>
        <div class="chatroom-right">
          <div class="chatroom-title"><h2>Public</h2></div>
          <div class="chatroom-messages">
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
          <BaseInput placeholder="Type a message" class="chatroom-message-box" inputType="message-box"/>
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
    ChatroomCard
  },
  data () {
    return {
      // TODO: change userId to authenticated user
      userId: '5d119940047e5e37a8986220',
      searchText: '',
      typeChoosen: 'PUBLIC',
      activeChatroomId: '',
      chatroomPage: 1,
      messagePage: 1,
      chatroomIntervalObject: '',
      messageIntervalObject: ''
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
      'fetchPublicMessages'
    ]),
    ...mapMutations([
      'resetMessages',
      'resetChatrooms'
    ]),
    getAvatarAndName(participants) {
      for (const participant of participants) {
        if (participant.id != userId) {
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
          }
        })
        this.resetChatrooms()
        this.resetChatroomPoll()
      } else {
        this.activeChatroomId = ''
        this.stopPolling()
        this.resetChatrooms()
        this.resetMessages()
        this.fetchPublicMessages({
          data: {
            params: {
              page: 1
            }
          },
          fail: err => console.log(err)
        })
        this.initPublicMessagesPoll()
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
    initPublicMessagesPoll () {
      this.messageIntervalObject = setInterval(() => {
        this.fetchPublicMessages({
          data: {
            params: {
              page: 1
            }
          },
          fail: err => console.log(err)
        })
      }, POLL_INTERVAL)
    }
  },
  watch: {
    activeChatroomId: function (newId, oldId) {
      clearInterval(this.messageIntervalObject)
      this.resetMessages()
      if (!newId) {
        this.initPublicMessagesPoll()
      } else {
        this.fetchMessages({
          data: {
            params: {
              chatroomId: this.activeChatroomId,
              page: 1
            }
          },
          fail: err => console.log(err)
        })
        this.initMessagesPoll()
      }
    }
  },
  mounted () {
    this.fetchPublicMessages({
      data: {
        params: {
          page: 1
        }
      },
      fail: err => console.log(err)
    })
    this.initPublicMessagesPoll()
  },
  destroyed () {
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
