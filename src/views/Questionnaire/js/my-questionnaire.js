import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import InfiniteLoading from 'vue-infinite-loading'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'

export default {
  name: 'MyQuestionnaire',
  components: {
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
      }, this.errorHandler, {
        params: {
          page: this.page,
          size: this.size
        }
      })
    }
  },
  // searchHandler (value) {
  //   this.page = 1
  //   this.keyword = value
  //   myQuestionnaireApi.getMyQuestionnaires(response => {
  //     this.questionnaires = response.data
  //   }, this.errorCallback, {
  //     params: {
  //       page: this.page,
  //       size: this.size,
  //       keyword: this.keyword
  //     }
  //   })
  // },
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
