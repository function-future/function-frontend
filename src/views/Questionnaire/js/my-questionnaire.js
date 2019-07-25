import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import InfiniteLoading from 'vue-infinite-loading'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'

export default {
  name: 'MyQuestionnaire',
  components: {
    BaseCard,
    SearchBar,
    QuestionnaireCard,
    InfiniteLoading
  },
  data () {
    return {
      myQuestionnaires: [],
      page: 1,
      size: 10
    }
  },
  methods: {
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
    },
    infiniteHandler ($state) {
      myQuestionnaireApi.getMyQuestionnaires(response => {
        if (this.page === 1) {
          this.myQuestionnaires = []
        }
        if (response.data.length) {
          this.page += 1
          this.myQuestionnaires.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size
        }
      })
    }
  }
}
