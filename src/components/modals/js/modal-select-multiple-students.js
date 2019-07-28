import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import UserListCard from '@/components/UserListCard'
import BaseCard from '@/components/BaseCard'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'modal-select-multiple-students',
  components: {
    BaseButton,
    UserListCard,
    BaseCard,
    InfiniteLoading
  },
  props: ['currentlySelected'],
  data () {
    return {
      studentList: [],
      selectedStudents: [],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 20
      },
      state: ''
    }
  },
  computed: {
    ...mapGetters([
      'students'
    ])
  },
  methods: {
    ...mapActions([
      'fetchUsersByRole',
      'setStudentList'
    ]),
    close () {
      this.$emit('close')
    },
    selectStudents () {
      this.$emit('selected', this.selectedStudents)
    },
    initStudents ($state) {
      this.state = $state
      let data = {
        page: this.paging.page,
        size: this.paging.size,
        role: 'STUDENT'
      }
      this.fetchUsersByRole({
        data,
        callback: this.successFetchingStudentList,
        fail: this.failedFetchingStudentList
      })
    },
    successFetchingStudentList (response) {
      this.paging = response.paging
      this.studentList.push(...response.data)
      if (response.data.length) {
        this.setStudentList({ data: response.data })
        this.studentList = [ ...this.students ]
        this.selectedStudents = [ ...this.currentlySelected ]
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failedFetchingStudentList () {
      this.$toasted.error('Something went wrong')
    },
  }
}
