import BaseButton from '@/components/BaseButton'
import SearchBar from '@/components/SearchBar'
import UserListCard from '@/components/UserListCard'


export default {
  name: 'modal',
  components: {
    BaseButton,
    SearchBar,
    UserListCard
  },
  data() {
    return {
      chatroomData: {},
      users: [],
      keyword: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    create () {
      this.$emit('submit', this.chatroomData)
    },
    changeKeyword (value) {
      this.keyword = value
    }
  }
}
