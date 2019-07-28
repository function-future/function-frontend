import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'

export default {
  name: 'AddJudging',
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
        name: '',
        description: '',
        students: []
      },
      selectedStudents: [],
      showSelectStudentModal: false
    }
  },
  computed: {},
  methods: {
    ...mapActions([
      'createJudging'
    ]),
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
      this.judgingDetail.students = []
      this.selectedStudents.forEach((item) => {
        this.judgingDetail.students.push(item.id)
      })
      let data = {
        batchCode: this.$route.params.batchCode
      }
      let payload = {
        ...this.judgingDetail
      }
      this.createJudging({
        data,
        payload,
        callback: this.successCreatingJudging,
        fail: this.failCreatingJudging
      })
    },
    returnButtonClicked () {
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    successCreatingJudging () {
      this.$toasted.success('Successfully created final judging')
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    failCreatingJudging () {
      this.$toasted.error('Something went wrong')
    }
  }
}
