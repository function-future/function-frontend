import QuestionnaireParticipantDetailCard from '../QuestionnaireParticipantDetailCard'
import QuestionnaireCard from '../QuestionnaireCard'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'QuestionnaireResultsMemberDetail',
  components: {
    QuestionnaireParticipantDetailCard,
    QuestionnaireCard
  },
  data () {
    return {
      appraisee: {
        // avatar: 'http://localhost:8080/api/core/resources/user/cc5e1eb5-a580-4d5b-8d84-28ab17da9132-thumbnail.jpg',
        avatar: 'http://localhost:8080/api/core/resources/user/a96b55cf-e3b9-4ce6-b087-4aa666045bfb-thumbnail.jpg',
        name: 'Ricky',
        university: 'ITB',
        role: 'STUDENT',
        batch: {
          code: '3',
          name: '3'
        },
        score: 5.7
      },
      myQuestionnairesDummy: [
        {
          id: 'sample-id',
          title: 'myQuestionnaire-title',
          description: 'myQuestionnaire-description',
          startDate: 1562596044000,
          dueDate: 15626824440000,
          score: 5.7
        },
        {
          id: 'sample-id2',
          title: 'myQuestionnaire-title',
          description: 'myQuestionnaire-description',
          startDate: 1562596044000,
          dueDate: 15626824440000,
          score: 5.7
        },
        {
          id: 'sample-id3',
          title: 'myQuestionnaire-title',
          description: 'myQuestionnaire-description',
          startDate: 1562596044000,
          dueDate: 15626824440000,
          score: 5.7
        }
      ],
      appraiseeTemp: {}
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentAppraiseeResults',
      'fetchCurrentAppraiseeResultsQuestionnaires'
    ]),
    ...mapMutations([
      'RESET_CURRENT_APPRAISEE_RESULTS',
      'ASSIGN_CURRENT_APPRAISEE_RESULTS',
      'RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES',
      'PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES'
    ]),
    goToQuestionnaireResult (questionnaireId) {
      this.$router.push({
        name: 'questionnaireResultsQuestionnaireDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: this.$route.params.userSummaryId,
          questionnaireId: questionnaireId
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'currentAppraiseeResult',
      'currentAppraiseeResultQuetionnaires'
    ])
  },
  watch: {
    currentAppraiseeResult () {
      this.appraiseeTemp = this.currentAppraiseeResult.member
      console.log(this.appraiseeTemp)
    }
  },
  created () {
    this.fetchCurrentAppraiseeResults({
      data: {
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: this.$route.params.userSummaryId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchCurrentAppraiseeResultsQuestionnaires({
      data: {
        params: {
          userSummaryId: this.$route.params.userSummaryId,
          page: 1,
          size: 10
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
