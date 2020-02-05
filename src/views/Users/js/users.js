import { mapActions, mapGetters } from 'vuex'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
const UserListItem = () => import('@/components/list/UserListItem')
const EmptyState = () => import('@/components/emptyState/EmptyState')

export default {
  name: 'users',
  components: {
    ModalDeleteConfirmation,
    UserListItem,
    EmptyState
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
      showDeleteConfirmationModal: false,
      failFetchUser: false,
      failFetchBatch: false,
      batches: [],
      selectedBatchCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    currentTab () {
      return this.tabs[this.activeTab].value
    },
    usersEmpty () {
      return !(this.userList && this.userList.length)
    }
  },
  created () {
    this.fetchBatchList()
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchUsersByRoleAndName',
      'deleteUserById',
      'toast',
      'fetchBatches'
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
        role: this.currentTab.toUpperCase(),
        batchCode: this.selectedBatchCode
      }
      this.fetchUsersByRoleAndName({
        data,
        callback: this.successGetUserList,
        fail: this.failGetUserList
      })
    },
    successGetUserList (response) {
      this.isLoading = false
      this.failFetchUser = false
      this.paging = response.paging
      this.userList = response.data
    },
    failGetUserList () {
      this.isLoading = false
      this.failFetchUser = true
      this.toast({
        data: {
          message: 'Fail to fetch list',
          type: 'is-danger'
        }
      })
    },
    goToAddUser () {
      if (this.currentTab === 'Student') {
        this.$router.push({ name: 'addStudent' })
      } else {
        this.$router.push({
          name: 'addUser',
          query: { role: this.currentTab.toUpperCase() }
        })
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
      this.toast({
        data: {
          message: 'successfully delete user',
          type: 'is-success'
        }
      })
    },
    failDeleteUserById () {
      this.toast({
        data: {
          message: 'Fail to delete user',
          type: 'is-danger'
        }
      })
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
    },
    fetchBatchList () {
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches (response) {
      this.batches = [
        {
          id: '',
          name: 'All',
          code: ''
        },
        ...response
      ]
      this.failFetchBatch = false
    },
    failFetchBatches () {
      this.batches = [
        {
          id: '',
          name: 'All',
          code: ''
        }
      ]
      this.failFetchBatch = true
      this.toast({
        data: {
          message: 'Fail to load batch list, please refresh the page',
          type: 'is-danger'
        }
      })
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
