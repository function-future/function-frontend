import ChatroomCard from '@/views/Chatrooms/ChatroomCard'
export default {
  name: 'ChatroomList',
  components: {
    ChatroomCard
  },
  data: () => {
    return {
      searchKeyword: '',
      page: 0
    }
  },
  methods: {
    onClickAdd () {
      this.$emit('clickAdd')
    }
  },
  props: {
    mobile: Boolean
  }
}
