import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import QuestionCard from '@/views/Questionnaire/QuestionCard'
import QuestionnaireParticipantSimpleCard from '@/views/Questionnaire/QuestionnaireParticipantSimpleCard'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'QuestionnaireResultsQuestionDetail',
  components: {
    QuestionnaireCard,
    QuestionCard,
    QuestionnaireParticipantSimpleCard
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
      currentQuestion: {
        id: 'question-id',
        description: 'Lorem-ipsum',
        score: 6.0
      },
      appraisers: [
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        }, {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        }, {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        },
        {
          id: '5d2352954534202434730f29',
          name: 'Tzuyu',
          avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
          score: 6.0
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentQuestionnaireDetail',
      'fetchCurrentResultQuestionDetail',
      'fetchCurrentResultsQuestionDetailResponsesList'
    ]),
    errorHandler (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters([
      'currentResultQuestionnaireDetail',
      'currentResultQuestionDetail',
      'currentResultsQuestionDetailResponsesList'
    ])
  },
  created () {
    this.fetchCurrentQuestionnaireDetail({
      data: {
        params: {
          questionnaireResponseSummaryId: this.$route.params.questionnaireId
        }
      },
      fail: this.errorHandler
    })
    this.fetchCurrentResultQuestionDetail({
      data: {
        params: {
          questionResponseSummaryId: this.$route.params.questionId
        }
      },
      fail: this.errorHandler
    })
    this.fetchCurrentResultsQuestionDetailResponsesList({
      data: {
        params: {
          questionResponseSummaryId: this.$route.params.questionId
        }
      },
      fail: this.errorHandler
    })
  }
}
