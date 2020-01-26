import ChatroomList from '@/views/Chatrooms/ChatroomList'
import ChatroomContent from '@/views/Chatrooms/ChatroomContent'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import EmptyState from '@/components/emptyState/EmptyState'

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
    ModalChatroom,
    EmptyState
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
      this.toast({
        data: {
          message: 'Create chatroom success',
          type: 'is-success'
        }
      })
      this.activateChatroom(response.data.id)
    },
    onClickChatroom (chatroomId) {
      this.activateChatroom(chatroomId)
    }
  }
}
