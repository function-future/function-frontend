import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import SearchBar from '@/components/SearchBar'
import UserListCard from '@/components/UserListCard'
import usersApi from '@/api/controller/users'
import chatroomApi from '@/api/controller/chatrooms'
import { mapGetters, mapActions } from 'vuex'
import UserSimpleCard from '@/components/UserSimpleCard'

export default {
  name: 'ModalChatroom',
  components: {
    BaseButton,
    SearchBar,
    UserListCard,
    BaseInput,
    UserSimpleCard
  },
  data () {
    return {
      users: [],
      selectedUsers: [],
      chatroom: {},
      picture: null,
      wrongName: false,
      nameMember: '',
      maximumSizeAlert: false,
      isUploading: false,
      isNext: false
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
    ...mapActions([
      'uploadGroupImage',
      'fetchDetailChatroom'
    ]),
    convertToListUserId (users) {
      let result = users.map(user => user.id)
      result.push(this.currentUser.id)
      return result
    },
    enterSearchHandler (event) {
      if (event.keyCode === 13 && this.nameMember) {
        this.selectedUsers.push(this.usersWithoutSelectedOne[0])
      }
    },
    close () {
      this.$emit('close')
    },
    nextOrSave () {
      if (this.selectedUsers.length > 1) {
        this.isNext = true
      } else {
        this.create()
      }
    },
    create () {
      if (this.selectedUsers.length > 1 && !this.chatroom.name) {
        this.wrongName = true
      } else if (this.selectedUsers.length > 0) {
        this.$emit('submit', {
          name: this.chatroom.name,
          picture: this.chatroom.picture,
          members: this.convertToListUserId(this.selectedUsers)
        })
        this.$emit('close')
      }
    },
    changeKeyword (value) {
      this.nameMember = value
      this.callSearchUserApi(value)
    },
    errorHandler (err) {
      console.error(err)
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
      }, this.errorHandler)
    },
    enterPressed (event) {
      if (event.keyCode === 13 && (this.selectedUsers.length > 1 && this.chatroom.name)) {
        this.$emit('submit', {
          name: this.chatroom.name,
          picture: this.chatroom.picture,
          members: this.convertToListUserId(this.selectedUsers)
        })
        this.$emit('close')
      }
    },
    onFileChange (e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      let data = {
        source: 'UNKNOWN',
        resources: formData
      }
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.isUploading = true
      this.uploadGroupImage({
        data,
        configuration,
        callback: this.successUploadGroupPicture,
        fail: this.failUploadGroupPicture
      })
    },
    successUploadGroupPicture (response) {
      this.isUploading = false
      this.chatroom.picture = response.id
      this.picture = response.file.full
    },
    failUploadGroupPicture () {
      this.isUploading = false
      this.toast({
        data: {
          message: 'Fail to upload image, please try again',
          type: 'is-danger'
        }
      })
    },
    fetchDetailChatroomCallback (response) {
      this.callSearchUserApi('')
      this.picture = response.data.picture ? response.data.picture.file.full : null
      this.selectedUsers = response.data.members.filter(user => user.id !== this.currentUser.id)
      this.chatroom = response.data
      this.chatroom.picture = response.data.picture ? response.data.picture.id : null
    }
  },
  created () {
    if (this.chatroomId) {
      this.fetchDetailChatroom({
        data: {
          params: {
            chatroomId: this.chatroomId
          }
        },
        fail: this.errorHandler,
        cb: this.fetchDetailChatroomCallback
      })
    } else {
      this.callSearchUserApi('')
    }
  }
}
