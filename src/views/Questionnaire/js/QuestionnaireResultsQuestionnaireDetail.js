import QuestionnaireCard from '../QuestionnaireCard'
import QuestionCard from '../QuestionCard'

export default {
  name: 'QuestionnaireResultsQuestionnaireDetail',
  components: {
    QuestionnaireCard,
    QuestionCard
  },
  data () {
    return {
      currentQuestionnaire: {
        id: 'sample-id3',
        title: 'myQuestionnaire-title',
        description: 'myQuestionnaire-description',
        startDate: 1562596044000,
        dueDate: 15626824440000,
        score: 5.7
      },
      currentUser: {
        id: 'user-sample-id',
        name: 'Ricky'
      },
      questions: [
        {
          id: 'question-id',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id1',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id2',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id3',
          description: 'Lorem-ipsum',
          score: 6.0
        }
      ],
      i: 1
    }
  },
  methods: {
    goToQuestionnaireResult (questionnaireId) {
      this.$router.push({
        name: 'questionnaireResultsQuestionnaireDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          memberId: this.$route.params.memberId,
          questionnaireId: questionnaireId
        }
      })
    },
    goToQuestionDetail (questionId) {
      this.$router.push({
        name: 'questionnaireResultsQuestionDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          memberId: this.$route.params.memberId,
          questionnaireId: this.$route.params.questionId,
          questionId: questionId
        }
      })
    }
  }
}
