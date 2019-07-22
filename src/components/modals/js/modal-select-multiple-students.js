import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import UserListCard from '@/components/UserListCard'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'modal-select-multiple-students',
  components: {
    BaseButton,
    UserListCard,
    BaseCard
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'students'
    ])
  },
  created () {
    this.initData()
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
    initData () {
      let data = {
        page: this.paging.page,
        size: this.paging.size,
        role: 'STUDENT'
      }
      this.fetchUsersByRole({
        data,
        callback: this.successFetchingUsers,
        fail: this.failFetchingUsers
      })
    },
    successFetchingUsers () {
      this.selectedStudents = [ ...this.currentlySelected ]
      // this.students = this.batchList.filter(batch => batch.code !== this.$route.params.batchCode)
    },
    failFetchingUsers () {
      this.$toasted.error('Fail to fetch batches, please try again')
    }
  }
}
