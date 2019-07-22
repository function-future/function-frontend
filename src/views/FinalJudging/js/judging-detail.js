import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'

export default {
  name: 'JudgingDetail',
  components: {
    BaseInput,
    BaseCard,
    BaseButton,
    BaseTextArea,
    ModalSelectMultipleStudents
  },
  data () {
    return {
      judgingDetail: {
        title: '',
        description: '',
        students: []
      },
      selectedStudents: [],
      isLoading: true,
      editMode: false,
      showSelectStudentModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'judging',
      'students'
    ])
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'updateJudging',
      'fetchUsersByRole',
      'setStudentList'
    ]),
    initPage () {
      this.fetchJudgingDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successFetchingJudgingDetail,
        fail: this.failedFetchingJudgingDetail
      })
    },
    successFetchingJudgingDetail () {
      this.fetchUsersByRole({
        data: {
          page: 1,
          size: 10,
          role: 'STUDENT',
        },
        callback: this.successFetchingUsersByRole,
        fail: this.failedFetchingUsersByRole
      })
      this.judgingDetail = { ...this.judging }
    },
    successFetchingUsersByRole (response) {
      this.setStudentList({ data: response.data })
      this.judging.studentIds.forEach((item) => {
        this.selectedStudents.push(this.students.find((student) => student.id === item))
      })
      this.isLoading = false
    },
    failedFetchingUsersByRole (err) {
      console.log(err)
    },
    failedFetchingJudgingDetail () {
      this.$toasted.error('Something went wrong')
    },
    goToComparison () {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: this.$route.params.judgingId
        }
      })
    },
    toggleSelectStudentModal () {
      this.showSelectStudentModal = true
    },
    closeSelectStudentModal () {
      this.showSelectStudentModal = false
    },
    setSelectedStudents (selectedStudentList) {
      this.selectedStudents = selectedStudentList
      this.closeSelectStudentModal()
    },
    actionButtonClicked () {
      if (this.editMode) {
        //TODO: CHANGE THIS ACCORDING TO BACKEND RESPONSE AND REQUEST
        console.log(this.judgingDetail)
        this.selectedStudents.forEach((item) => {
          this.judgingDetail.students.push(item.id)
        })
        let data = {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        }
        let payload = {
          id: this.$route.params.judgingId,
          ...this.judgingDetail
        }
        this.updateJudging({
          data,
          payload,
          callback: this.successUpdatingJudging,
          fail: this.failUpdatingJudging
        })
      }
      this.editMode = !this.editMode
    },
    returnButtonClicked () {
      alert()
    },
    successUpdatingJudging () {
      this.$toasted.success('Successfully updated final judging')
    },
    failUpdatingJudging () {
      this.$toasted.error('Something went wrong')
    }
  }
}
