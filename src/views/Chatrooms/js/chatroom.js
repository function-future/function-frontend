import ChatroomList from '@/views/Chatrooms/ChatroomList'
import ChatroomContent from '@/views/Chatrooms/ChatroomContent'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import Breakpoint from '@/mixins/Breakpoint'
import { mapActions } from 'vuex'

export default {
  name: 'Chatroom',
  mixins: [
    Breakpoint
  ],
  components: {
    ChatroomList,
    ChatroomContent,
    ModalChatroom
  },
  created () {
  },
  data () {
    return {
      showCreateModal: false,
      activeChatroomId: ''
    }
  },
  methods: {
    ...mapActions([
      'createChatroom',
      'toast'
    ]),
    onSubmitNewChatroom (data) {
      this.createChatroom({
        data: {
          body: data
        },
        fail: this.onError,
        cb: this.onSuccessCreateChatroom
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
    activateChatroom (chatroomId) {
      this.activeChatroomId = chatroomId
      if (this.isMobile) {
        this.$router.push({ name: 'chatroomsMobile', params: { chatroomId } })
      }
    },
    onSuccessCreateChatroom (response) {
      this.activateChatroom(response.data.id)
    },
    onClickChatroom (chatroomId) {
      this.activateChatroom(chatroomId)
    }
  }
}
