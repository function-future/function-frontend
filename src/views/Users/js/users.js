import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import UserCard from '@/components/users/UserCard'
import Tabs from 'vue-tabs-with-active-line'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'announcements',
  components: {
    UserCard,
    BaseButton,
    Tabs,
    ModalDeleteConfirmation
  },
  data () {
    return {
      tabs: [
        { title: 'Students', value: 'student' },
        { title: 'Admins', value: 'admin' },
        { title: 'Mentors', value: 'mentor' },
        { title: 'Judges', value: 'judge' }
      ],
      currentTab: 'student',
      paging: {
        page: 0,
        size: 10
      },
      showDeleteConfirmationModal: false,
      students: [],
      admins: [],
      judges: [],
      mentors: []
    }
  },
  computed: {
    ...mapGetters([
      'userList'
    ]),
    addUserButtonLabel () {
      if (this.currentTab === 'student') {
        return 'Student'
      } else {
        return 'User'
      }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'deleteUserById'
    ]),
    initPage () {
      this.fetchTabList()
    },
    changeTab (destinationTab) {
      this.currentTab = destinationTab
      this.fetchTabList()
    },
    fetchTabList () {
      let data = {
        page: this.paging.page,
        size: this.paging.size,
        role: this.currentTab
      }
      this.fetchUsers({
        data,
        callback: this.successGetUserList,
        fail: this.failGetUserList
      })
    },
    successGetUserList (response) {
      switch (this.currentTab) {
        case 'student': {
          this.students = response
          break
        }
        case 'admin': {
          this.admins = response
          break
        }
        case 'mentor': {
          this.mentors = response
          break
        }
        case 'judge': {
          this.judges = response
          break
        }
      }
    },
    failGetUserList () {
      this.$toasted.error('Fail to fetch list')
    },
    goToAddUser () {
      if (this.currentTab === 'student') {
        this.$router.push({ name: 'addStudent' })
      } else {
        this.$router.push({ name: 'addUser' })
      }
    },
    closeDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = false
    },
    goToEditUser (id, role) {
      let name = ''
      role === 'STUDENT' ? name = 'editStudent' : name = 'editUser'
      this.$router.push({
        name: name,
        params: { id: id }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisUser () {
      let id = { 'id': this.selectedId }
      let data = { ...id }

      this.deleteUserById({
        data,
        callback: this.successDeleteUserById,
        fail: this.failDeleteUserById
      })
    },
    successDeleteUserById () {
      this.$router.push({ name: 'users' })
      this.$toasted.success('successfully delete user')
      this.closeDeleteConfirmationModal()
    },
    failDeleteUserById () {
      this.$toasted.error('Fail to delete user')
      this.closeDeleteConfirmationModal()
    }
  }
}