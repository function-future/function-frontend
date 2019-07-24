import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MyQuestionnaire',
  components: {
    BaseCard,
    SearchBar,
    QuestionnaireCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'myQuestionnaires'
    ])
  },
  methods: {
    ...mapActions([
      'fetchMyQuestionnaires'
    ]),
    goToListAppraisees (questionnaireId, disabled) {
      if (!disabled) {
        this.$router.push({
          name: 'myQuestionnaireAppraisee',
          params: { questionnaireId: questionnaireId }
        })
      }
    },
    errorHandler (err) {
      console.log(err)
    }
  },
  created () {
    this.fetchMyQuestionnaires({
      data: {
        params: {
          page: 1,
          size: 10
        }
      },
      fail: this.errorHandler
    }
    )
  }
}
