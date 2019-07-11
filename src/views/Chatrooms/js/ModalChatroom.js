import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import SearchBar from '@/components/SearchBar'
import UserListCard from '@/components/UserListCard'
import usersApi from '@/api/controller/users'
import chatroomApi from '@/api/controller/chatrooms'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalChatroom',
  components: {
    BaseButton,
    SearchBar,
    UserListCard,
    BaseInput
  },
  data () {
    return {
      users: [],
      selectedUsers: [],
      name: null,
      wrongName: false
    }
  },
  props: {
    chatroomId: String
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    usersWithoutSelectedOne () {
      return this.users.filter(user => {
        return user.id !== this.currentUser.id &&
          !this.selectedUsers.map(usr => usr.id).includes(user.id)
      })
    }
  },
  methods: {
    convertToListUserId (users) {
      let result = users.map(user => user.id)
      result.push(this.currentUser.id)
      return result
    },
    close () {
      this.$emit('close')
    },
    create () {
      if (this.selectedUsers.length > 1 && !this.name) {
        this.wrongName = true
      } else if (this.selectedUsers.length > 0) {
        this.$emit('submit', {
          name: this.name,
          members: this.convertToListUserId(this.selectedUsers)
        })
        this.$emit('close')
      }
    },
    changeKeyword (value) {
      this.callSearchUserApi(value)
    },
    callSearchUserApi (name) {
      usersApi.searchUser(response => {
        this.users = response.data
      }, {
        params: {
          page: 1,
          size: 10,
          name: name
        }
      }, err => console.log(err))
    },
    enterPressed (event) {
      if (event.keyCode === 13 && (this.selectedUsers.length > 1 && this.name)) {
        this.$emit('submit', {
          name: this.name,
          members: this.convertToListUserId(this.selectedUsers)
        })
        this.$emit('close')
      }
    }
  },
  created () {
    if (this.chatroomId) {
      chatroomApi.getChatroomDetails(response => {
        this.callSearchUserApi('')
        if (response.data.type === 'GROUP') {
          this.name = response.data.name
        }
        this.selectedUsers = response.data.members.filter(user => user.id !== this.currentUser.id)
      }, err => console.log(err), {
        params: {
          chatroomId: this.chatroomId
        }
      })
    } else {
      this.callSearchUserApi('')
    }
  }
}
