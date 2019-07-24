import QuestionnaireCard from '../QuestionnaireCard'
import QuestionCard from '../QuestionCard'
import QuestionnaireParticipantSimpleCard from '../QuestionnaireParticipantSimpleCard'
import {mapActions, mapGetters, mapMutations} from 'vuex';
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
        },{
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
        },{
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
    ...mapMutations([
      'RESET_CURRENT_QUESTIONNAIRE_DETAIL',
      'ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL',
      'RESET_CURRENT_QUESTION_DETAIL',
      'ASSIGN_CURRENT_QUESTION_DETAIL',
      'RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST',
      'PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST'
    ])
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
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchCurrentResultQuestionDetail({
      data: {
        params: {
          questionResponseSummaryId: this.$route.params.questionId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchCurrentResultsQuestionDetailResponsesList({
      data: {
        params: {
          questionResponseSummaryId: this.$route.params.questionId
        }
      },
      fail: (err) => {
        console.log(err)
      },
      cb: (response) => {
        console.log(response)
      }
    })
  }
}
