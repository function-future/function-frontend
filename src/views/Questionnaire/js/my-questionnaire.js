import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import InfiniteLoading from 'vue-infinite-loading'
import EmptyState from '@/components/emptyState/EmptyState'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'

export default {
  name: 'MyQuestionnaire',
  components: {
    QuestionnaireCard,
    InfiniteLoading,
    EmptyState
  },
  data () {
    return {
      myQuestionnaires: [],
      page: 1,
      size: 10,
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
      }, this.errorHandler, {
        params: {
          page: this.page,
          size: this.size
        }
      })
    },
    searchHandler (value) {
      this.page = 1
      myQuestionnaireApi.getMyQuestionnaires(response => {
        console.log(response.data)
        this.myQuestionnaires = response.data
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size,
          keyword: value
        }
      })
    }
  },
  created () {
    myQuestionnaireApi.getMyQuestionnaires(response => {
      this.myQuestionnaires.push(...response.data)
    }, this.errorHandler, {
      params: {
        page: this.page,
        size: this.size
      }
    })
  }
}
