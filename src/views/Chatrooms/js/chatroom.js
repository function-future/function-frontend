import ChatroomList from '@/views/Chatrooms/ChatroomList'
import ChatroomContent from '@/views/Chatrooms/ChatroomContent'
import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import Breakpoint from '@/mixins/Breakpoint'
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
      showCreateModal: false
    }
  },
  methods: {
    onSubmitNewChatroom (data) {
      console.log(data)
    }
  }
}
