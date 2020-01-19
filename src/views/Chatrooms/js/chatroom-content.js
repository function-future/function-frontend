import Breakpoint from '@/mixins/Breakpoint'
import ChatroomType from '@/mixins/ChatroomType'
import CustomMobileNavBar from '@/components/skeletons/CustomMobileNavBar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChatroomContent',
  mixins: [
    Breakpoint,
    ChatroomType
  ],
  components: {
    CustomMobileNavBar
  },
  props: {
    chatroomId: String
  },
  data () {
    return {
      chatroom: {}
    }
  },
  created () {
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
  },
  destroyed () {
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
      'currentUser'
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
    }
  },
  methods: {
    ...mapActions([
      'fetchDetailChatroom',
      'leaveChatroom',
      'enterChatroom',
      'toast'
    ]),
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
    onError (e) {
      console.error(e)
      this.toast({
        data: {
          message: 'Fail to connect to server',
          type: 'is-danger'
        }
      })
    }
  },
  watch: {
    chatroomId (newChatroomId, oldChatroomId) {
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
    }
  }
}
