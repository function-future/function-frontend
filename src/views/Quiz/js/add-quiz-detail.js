import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'AddQuizDetail',
  components: {
    BaseButton,
    BaseCard,
    BaseTextArea,
    BaseInput
  },
  data () {
    return {
      quizDetail: {
        title: '',
        description: '',
        endDate: new Date(),
        timeLimit: 0,
        trials: 0,
        questionCount: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedBank'
    ])
  },
  methods: {
    ...mapActions([
      'createQuiz'
    ]),
    actionButtonClicked () {
      let payload = {
        ...this.quizDetail,
        questionBanks: [...this.selectedBank],
        startDate: new Date().getTime()
      }
      payload.timeLimit = Math.floor(this.quizDetail.timeLimit * 60)
      payload.endDate = new Date(payload.endDate).getTime()
      this.createQuiz({
        payload,
        data: {
          batchCode: this.$route.params.batchCode
        },
        callback: this.successCreatingQuiz,
        fail: this.failCreatingQuiz
      })
    },
    returnButtonClicked () {
      this.$router.push({
        name: 'quizzes',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    successCreatingQuiz () {
      this.$toasted.success(`Quiz successfully created`)
      this.$router.push({
        name: 'quizzes',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
    },
    failCreatingQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
