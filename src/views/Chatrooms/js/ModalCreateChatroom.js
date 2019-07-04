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
      selectedUsers: [{name: 'Priagung Satyagama'}, {name: 'Ricky Kennedy'}],
      keyword: ''
    }
  },
  computed: {
    usersWithoutSelectedOne () {
      return this.users.filter(user => {
        return !this.selectedUsers.map(usr => {
          return usr.id
        }).includes(user.id)
      })
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
