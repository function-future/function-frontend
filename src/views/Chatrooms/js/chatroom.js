import ChatroomList from '@/views/Chatrooms/ChatroomList'
import ChatroomContent from '@/views/Chatrooms/ChatroomContent'
import Breakpoint from '@/mixins/breakpoint'
export default {
  name: 'Chatroom',
  mixins: [
    Breakpoint
  ],
  components: {
    ChatroomList,
    ChatroomContent
  },
  created () {
  },
  data () {
    return {
    }
  }
}
