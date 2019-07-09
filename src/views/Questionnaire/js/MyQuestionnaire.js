import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '../QuestionnaireCard'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
    ...mapMutations([
      'RESET_MY_QUESTIONNAIRE',
      'PUSH_MY_QUESTIONNAIRE'
    ]),
    goToListAppraisees (questionnaireId) {
      this.$router.push({
        name: 'myQuestionnaireAppraisee',
        params: { questionnaireId: questionnaireId }
      })
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
      fail: (err) => {
        console.log(err)
      }
    }
    )
  }
}
