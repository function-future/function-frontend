import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'Quiz',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data () {
    return {}
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'quizList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuizList'
    ]),
    initPage () {
      this.fetchQuizList({
        data: {
          batchCode: 'futur3',
          page: 0,
          pageSize: 10
        },
        fail: this.failFetchingQuizList
      })
    },
    failFetchingQuizList () {
      this.$toasted.error('Something went wrong')
    },
    addQuiz () {
      this.$router.push({ name: 'addQuiz' })
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToQuizDetail (id, batch) {
      this.$router.push({
        name: 'quizDetail',
        params: {
          quizId: id
        },
        query: {
          batchCode: batch
        }
      })
    }
  }
}
