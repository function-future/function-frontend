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
        batch: '',
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
      const payload = {
        ...this.quizDetail,
        questionBankId: [...this.selectedBank]
      }
      this.createQuiz({
        payload: payload,
        data: {
          batchCode: this.quizDetail.batch,
        },
        callback: this.successCreatingQuiz,
        fail: this.failCreatingQuiz
      })
    },
    returnButtonClicked () {
      this.$router.push({name: 'quizzes'})
    },
    successCreatingQuiz () {
      this.$toasted.success(`Quiz successfully created`)
      this.$router.push({
        name: 'quizzes'
      })
    },
    failCreatingQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
