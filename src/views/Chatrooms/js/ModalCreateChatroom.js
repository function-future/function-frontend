import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import SearchBar from '@/components/SearchBar'
import UserListCard from '@/components/UserListCard'
import usersApi from '@/api/controller/users'

export default {
  name: 'modal',
  components: {
    BaseButton,
    SearchBar,
    UserListCard,
    BaseInput
  },
  data () {
    return {
      // TODO: change userId to authenticated user
      userId: '5d12a2ed32a1893cec242e73',
      users: [],
      selectedUsers: [],
      name: null,
      wrongName: false
    }
  },
  computed: {
    usersWithoutSelectedOne () {
      return this.users.filter(user => {
        return user.id !== this.userId &&
          !this.selectedUsers.map(usr => usr.id).includes(user.id)
      })
    }
  },
  methods: {
    convertToListUserId (users) {
      let result = users.map(user => user.id)
      result.push(this.userId)
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
      if (event.keyCode === 13 && ((this.selectedUsers.length > 1 && this.name) ||
        (this.selectedUsers.length > 0))) {
        this.$emit('submit', {
          name: this.name,
          members: this.convertToListUserId(this.selectedUsers)
        })
        this.$emit('close')
      }
    }
  },
  created () {
    this.callSearchUserApi('')
  }
}
