import { mapActions, mapGetters } from 'vuex'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import UserListItem from '@/components/list/UserListItem'

export default {
  name: 'users',
  components: {
    ModalDeleteConfirmation,
    UserListItem
  },
  data () {
    return {
      isLoading: false,
      tabs: [
        { title: 'Students', value: 'Student' },
        { title: 'Admins', value: 'Admin' },
        { title: 'Mentors', value: 'Mentor' },
        { title: 'Judges', value: 'Judge' }
      ],
      activeTab: 0,
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      userList: [],
      keyword: '',
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    currentTab () {
      return this.tabs[this.activeTab].value
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchUsersByRoleAndName',
      'deleteUserById'
    ]),
    initPage () {
      this.isLoading = true
      this.fetchTabList()
    },
    fetchTabList () {
      let data = {
        name: this.keyword,
        page: this.paging.page,
        size: this.paging.size,
        role: this.currentTab.toUpperCase()
      }
      this.fetchUsersByRoleAndName({
        data,
        callback: this.successGetUserList,
        fail: this.failGetUserList
      })
    },
    successGetUserList (response) {
      this.isLoading = false
      this.paging = response.paging
      this.userList = response.data
    },
    failGetUserList () {
      this.isLoading = false
      this.$toasted.error('Fail to fetch list')
    },
    goToAddUser () {
      if (this.currentTab === 'Student') {
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
      this.closeDeleteConfirmationModal()
    },
    successDeleteUserById () {
      this.fetchTabList()
      this.$toasted.success('successfully delete user')
    },
    failDeleteUserById () {
      this.$toasted.error('Fail to delete user')
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    searchHandler () {
      if (this.paging.page !== 1) this.paging.page = 1
      this.initPage()
    },
    batch (user) {
      return user.role === 'STUDENT' ? user.batch.name : ''
    }
  },
  watch: {
    activeTab () {
      this.paging.page = 1
      this.keyword = ''
      this.initPage()
    }
  }
}
