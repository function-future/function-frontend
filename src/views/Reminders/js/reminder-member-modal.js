import SearchBar from '@/components/SearchBar'
import UserListCard from '@/components/UserListCard'
import usersApi from '@/api/controller/users'

export default {
  name: 'ReminderMemberModal',
  components: {
    SearchBar,
    UserListCard
  },
  data () {
    return {
      users: [],
      name: ''
    }
  },
  props: {
    selectedUsers: {
      default: [],
      type: Array
    },
    isQuestionnaireSearch: {
      default: false,
      type: Boolean
    },
    isLoggingRoomSearch: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    usersWithoutSelectedOne () {
      if (this.isQuestionnaireSearch) {
        return this.users.filter(user => {
          return (!this.selectedUsers.map(usr => usr.id).includes(user.id) &&
            (user.role === 'STUDENT' || user.role === 'MENTOR'))
        })
      } else if (this.isLoggingRoomSearch) {
        return this.users.filter(user => {
          return (!this.selectedUsers.map(usr => usr.id).includes(user.id) && user.role === 'STUDENT')
        })
      }
      return this.users.filter(user => {
        return !this.selectedUsers.map(usr => usr.id).includes(user.id)
      })
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addMemberHandler (user) {
      this.$emit('addMember', user)
      this.close()
    },
    enterPressHandler (event) {
      if (event.keyCode === 13 && this.users.length > 0) {
        this.addMemberHandler(this.users[0])
      }
    },
    changeKeyword (value) {
      this.name = value
      this.callSearchUserApi()
    },
    callSearchUserApi () {
      usersApi.searchUser(response => {
        this.users = response.data
      }, {
        params: {
          page: 1,
          size: 10,
          name: this.name
        }
      }, this.errorHandler)
    },
    errorHandler (err) {
      console.log(err)
    }
  },
  created () {
    this.callSearchUserApi('')
  }
}
