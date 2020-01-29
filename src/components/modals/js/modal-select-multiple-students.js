import { mapActions, mapGetters } from 'vuex'
import UserListItem from '@/components/list/UserListItem'
import ListItem from '@/components/list/ListItem'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'modal-select-multiple-students',
  components: {
    ListItem,
    UserListItem,
    InfiniteLoading
  },
  props: ['currentlySelected'],
  data () {
    return {
      studentList: [],
      selectedStudents: [],
      selectedId: [],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      state: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'students'
    ])
  },
  created () {
    this.initialState()
  },
  methods: {
    ...mapActions([
      'getBatchReport',
      'setStudentList',
      'toast'
    ]),
    initialState () {
      this.selectedStudents = [ ...this.currentlySelected ]
      this.selectedStudents.forEach(student => this.selectedId.push(student.id))
    },
    close () {
      this.$emit('close')
    },
    select (studentId) {
      if (this.selectedId.length <= 3) {
        if (this.selectedId.find(value => value === studentId)) {
          this.selectedId.splice(this.selectedId.indexOf(studentId), 1)
        }
        else if (this.selectedId.length < 3) {
          this.selectedId.push(studentId)
        }
      }
    },
    selectStudents () {
      this.selectedStudents = []
      this.selectedId.forEach(id => {
        this.studentList.forEach(student => {
          if (student.id === id) {
            this.selectedStudents.push(student)
          }
        })
      })
      this.$emit('selected', this.selectedStudents)
    },
    initStudents ($state) {
      this.isLoading = true
      this.state = $state
      let data = {
        page: this.paging.page,
        size: this.paging.size,
        batchCode: this.$route.params.batchCode
      }
      this.getBatchReport({
        data,
        callback: this.successFetchingStudentList,
        fail: this.failedFetchingStudentList
      })
    },
    successFetchingStudentList (response) {
      this.paging = response.paging
      if (response.data.length) {
        this.setStudentList({ data: response.data })
        this.studentList.push(...response.data)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
      this.isLoading = false
    },
    failedFetchingStudentList () {
      this.toast({
        data: {
          message: 'Fail to load student list, please try again',
          type: 'is-danger'
        }
      })
      this.isLoading = false
    }
  }
}
